import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const pages = [];
const timersfile = "./src/timers.json";
const directoryPath = "./timers"
console.log("Building Timers");
console.log("--------------------------------");
fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return; 
    }
    
    for (let i = 0; i < files.length; i++) {
      const slug = files[i].replace(".md", "");
      const filePath = path.resolve(`timers/${slug}.md`);
      const file = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(file);  
      const titleMatch = new RegExp("# (.*)", "g");
      const codeMatch = new RegExp("```clock([\\s\\S]*?)```", "g");
      const title = titleMatch.exec(content);
      const clock = codeMatch.exec(content);        
      console.log("Adding: " + slug); 
      pages.push({      
        slug,
        title: (title[1] || "Unknown"),
        seed: (clock[1] || ""),
        raw: content,      
      })
    }        
    console.log("--------------------------------");
    console.log("Writing to:" + timersfile)    
    fs.writeFileSync(timersfile, JSON.stringify(pages))
    console.log("--------------------------------");
});