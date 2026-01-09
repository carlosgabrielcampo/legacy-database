import { createInterface } from 'readline'
import { createReadStream } from 'fs'

class PhoneDbFixed {
    async findAll(obj) {
        return new Promise((resolve, reject) => {
            try {
            let phoneJson = []
                createInterface({input: createReadStream("./src/database/phones.txt"),crlfDelay: Infinity})
                .on('line', (line) => {
                    if(obj.includes(line.split(',')[1]*1)) phoneJson.push(line)
                })
                .on('close', () => resolve(phoneJson))
            } catch (err) {
                reject('Erro de leitura de planilha')
            }
        })
    }
}

export default new PhoneDbFixed();