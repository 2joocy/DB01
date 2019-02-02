import { Person } from "./types/interface";
import fs from 'fs'

export default class Main{
    // Could be anything, change Person to Object and boom
    private table: Map<number, Person>;

    constructor(){
        this.table = new Map<number, Person>();
        fs.exists(`./dist/ressources/bingo.dll`, (exists) => {
            if(exists){
                this.fromObjectToMap(fs.readFileSync('./dist/ressources/bingo.dll', 'utf-8'))
            }else{
                fs.writeFile('./dist/ressources/bingo.dll', Buffer.from(""), "utf-8", (err: any) => {
                    if (err) throw err;
                    console.log("The file was succesfully saved!");
                });
            }
        })
        setTimeout(() => {
            this.main();
        }, 100)
    }

    public main() : void {
        console.log(this.table)
    }

    start(){
        fs.readFileSync('./dist/ressources/bingo.dll')    
    }

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

    getFromKey(key: number): Person | undefined{
        return this.table.get(key); 
    }

    addPerson(person: Person): void{
        this.table.set(this.table.size, person);
        this.addToDb(person);
    }

    deletePerson(person: Person, key?: number): void{
        if(key){
            this.table.delete(key)
        }else{
            this.table.forEach((value, key) => {
                if(value === person){
                    this.table.delete(key)
                }
            })
        }
        this.deleteFromDb(person);
    }

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

    strMapToObj(strMap: Map<number, Person>):void {
        let strToAppend : string = "";
        this.table.forEach((person) => {
            strToAppend += `\n{${person.name},${person.age},${person.height},}`
        })
    }

    jsonToStrMap(jsonStr: string) {
        return this.fromObjectToMap(JSON.parse(jsonStr));
    }

}

new Main();