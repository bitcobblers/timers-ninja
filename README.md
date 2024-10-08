# Markdown Timer ⚡️

Defining timers with user interfaces can be cumbersome, particularly for complex time-tracking needs. Identifying repeating tasks like rest and work sets, however, becomes simple with Markdown.

## Getting Started

To start with development run the following commands:

1. Run the unit tests

```shell
npm run test.unit  
```

2. Storybook ( Examples / Documentation )

```shell
npm run storybook
```

Start up a local server

```shell
npm run start
```

Update the timers data file

```Shell
npm run build.timers
```
## Syntax Parser Diagram

![syntax diagram](./syntax-diagram.png)


UI
----

Clock  
- Running timer (update event, context element updated)
- UserEvent (Start / Lap / Stop, Reset )

Code / Workout Editor
- Entry for code blocks