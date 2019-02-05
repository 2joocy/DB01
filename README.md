# Database Assignment 01

The code is written in TypeScript, and uses a map with a index to quickly find objects. The program is structured as such:

## Installation
To run the project, you'll have to have the newest version of NodeJS installed, and do the following:

```npm i -g typescript```

```npm i```

Once you've done that, you open a console in the root folder of the project and type in ``tsc```

Remember to drag in the ressource folder to the transpiled folder.

## Documentation

The program reads a DLL file from a ressource folder, and fills it's cached hashedmap up with the data.

Once the hashmap is filled, each addition, or deletion is appended to the file. 

Data is read as such on startup:

```
fromObjectToMap(db: string): void {
        const dbArr = db.match(new RegExp("\{.*?\}", "g"))
        if(dbArr)
        dbArr.forEach((item, index) => {
            const itemSplit = item.split(",");
            this.table.set(index+1, {
                name: itemSplit[0],
                age: parseFloat(itemSplit[1]),
                height: parseFloat(itemSplit[2])
            })
        })
    }
```

The appended functions looks like this:

```
addToDb(person: Person): void{
        fs.appendFile('./dist/ressources/bingo.dll', "utf-8", `{${person.name},${person.age},${person.height}\n}`, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        });
    }

    deleteFromDb(person: Person){
        fs.readFile('./dist/ressources/bingo.dll', "utf-8", (err, data) => {
            const readDb = data.toString();
            readDb.replace(`\W*{${person.name},${person.age},${person.height}}`, "")
            fs.writeFile("./dist/ressources/bingo.dll", readDb, (err) => {
                if(err)
                    console.error(err)
                                
            })

        })  
    }
```
