export class HashMap {
    constructor(loadFactor) {
        this.buckets = [];
        this.loadFactor = loadFactor;
        //16 is the default size of array/map in many languages
        this.capacity = loadFactor == 0.75 ? 16 : 0;
    }

    //takes a string key and produces a hash code with it
    hash(key){
        const primeNumber = 31;
        let hashcode = 0;

        for (let i = 0; i < key.length; i++){
            hashcode = hashcode * primeNumber + key.charCodeAt(i);
        }
        return hashcode % 16;
    }
    //takes two arguments: the first is a key and the second is a value to associate with the key. 
    // If the key already exists in the hash map, then the old value associated with it should be overwritten by the new one.
    set(key, value){
        const hashKey = this.hash(key)
        const bucketArr = new Array();
        const bucket = {key : key, value : value};
        
        if (this.buckets[hashKey] === undefined){
            bucketArr.push(bucket)
            this.buckets[hashKey] = bucketArr;
        }else{
            for (const b of this.buckets[hashKey]){
                if (b.key == key){
                    b.value = value;
                }else{
                    this.buckets[hashKey].push(bucket)
                }
            }
        }
    }
    // takes a key as an argument and returns the value that is associated with it.
    //  If the key is not found, return undefined.
    get(key){
        const hashKey = this.hash(key)
        if (this.buckets[hashKey] === undefined) return undefined;
        for (const b of this.buckets[hashKey]){
            if (b.key == key){
                return b.value;
            }
        }
    }
    //takes a key as an argument and returns a boolean based on whether or not the key is in the hash map.
    has(key){
        return this.get(key) !== undefined
    }

    //takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key then return true.
    // If the key isn't in the hash map, it should return false.
    remove(key){
        const hashKey = this.hash(key)
        if (this.has(key)){
            for (const b in this.buckets[hashKey]){
                const bucket = this.buckets[hashKey][b]
                if (bucket.key == key){
                    this.buckets[hashKey].splice(b, 1);
                    return true;
                }
            }
        }
        return false;
    }
    // returns the number of stored keys in the hash map.
   length(){
        let totalKeys = 0;
        for (const b of this.buckets){
            if (b !== undefined){
                totalKeys += b.length;
            }
        }
        return totalKeys;
    }

    // removes all entries in the hash map.
    clear(){
        this.buckets.splice(0);
    }

    //returns an array containing all the keys (not values) inside the hash map.
    keys(){
        let bucketKeys = [];
        this.buckets.map(bucket => {
            if (bucket !== undefined){
                for (const b of bucket){
                    bucketKeys.push(b.key)
                }
            }
        })
        return bucketKeys
    }
    // returns an array containing all the values (not keys) inside the hash map.
    values(){
        let bucketValues = [];
        this.buckets.map(bucket => {
            if (bucket !== undefined){
                for (const b of bucket){
                    bucketValues.push(b.value)
                }
            }
        })
        return bucketValues
    }
    // returns an array that contains each key-value pair in their own arrays,
    // for example: [[firstKey, firstValue], [secondKey, secondValue]].
    entries(){
        let bucketEntries = [];
        this.buckets.map(bucket => {
            if (bucket !== undefined){
                for (const b of bucket){
                    bucketEntries.push([b.key, b.value])
                }
            }
        })
        return bucketEntries;
    }
}
