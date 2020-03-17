module.exports.promisify = fn => (arg={}) => new Promise((resolve,reject)=>{
    arg.success = function(res){
       return resolve(res)
    }
    arg.fail = function(err){
       return reject(err)
    }
    fn(arg)
})