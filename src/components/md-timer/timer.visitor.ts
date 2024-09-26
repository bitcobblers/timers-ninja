import { MdTimerParse } from "./timer.parser";
import { Minus } from "./timer.tokens";
import type { MDTimerCommand } from "./timer.types";

const parser = new MdTimerParse() as any;
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdTimerInterpreter extends BaseCstVisitor {
  constructor() {
    super();
    // This helper will detect any missing or redundant methods on this visitor

    this.validateVisitor();
  }

  /// High level entry point, contains any number of simple of compound timers.
  timerMarkdown(ctx: any): MDTimerCommand[] {
    const result = ctx.blocks.flatMap(
      (block: any) => block && this.visit(block),
    ) as MDTimerCommand[];
    return result;
  }

  timerBlock(ctx: any) {
    const blocks = [];
    if (ctx.compoundTimer || ctx.simpleTimer) {
      const outcome = this.visit(ctx.compoundTimer || ctx.simpleTimer).flat(
        Infinity,
      );
      const labels = ctx.timerMultiplier
        ? this.visit(ctx.timerMultiplier)
        : [{ round: 1, label: "" }];
      for (const label of labels) {
        for (const index of outcome) {
          if (index != null) {
            blocks.push({
              ...index,
              label: index.label
                ? label.label + " - " + index.label
                : label.label,
            });
          }
        }
      }
    }

    return blocks;
  }

  compoundTimer(ctx: any) {
    return ctx.blocks.map((block: any) => this.visit(block));
  }

  simpleTimer(ctx: any): MDTimerCommand[] {
    const type =
      ctx.CountDirection && ctx.CountDirection[0].tokenType == Minus
        ? "down"
        : "up";
    const sources = [];
    if (ctx.CountDirection) {
      sources.push(ctx.CountDirection[0]);
    }
    sources.push(ctx.timerValue[0].children.Time);
    return [
      {
        icon : type,
        timer: (this.visit(ctx.timerValue) as number),
        sources,
      },
    ];
  }

  timerValue(cxt: any): any {
    const segments =
      cxt.Time != null
        ? cxt.Time[0].image.split(":").reverse()
        : [];

    while (segments.length < 4) {
      segments.push(0);
    }

    const time = {
      days: segments[3],
      hours: segments[2],
      minutes: segments[1],
      seconds: segments[0],
    };

    return time.seconds * 1 +
      time.minutes * 60 +
      time.hours * 60 * 60 +
      time.days * 60 * 60 * 24;
  }

  timerMultiplier(ctx: any) {
    return (
      ctx.multiplierValue?.flatMap((value: any) => this.visit(value)) || []
    );
  }
  multiplierValue(ctx: any) {
    const outcome = [];
    if (ctx.numericValue) {
      const count = this.visit(ctx.numericValue);
      for (let index = 0; index < count; index++) {
        outcome.push({ label: "Round " + (index + 1), index: index });
      }
    }

    if (ctx.stringValue) {
      const label = this.visit(ctx.stringValue);
      outcome.push({ label: label });
    }
    return outcome;
  }

  numericValue(ctx: any): number {
    const value = ctx.Integer[0].image;
    return Number(value);
  }

  stringValue(ctx: any): string {
    return ctx.Identifier[0].image;
  }
}
