export const users = {}

export const getUser = (arr)=>{
    onlineUsers = []
    arr.forEach((onlineUsers)=>{
        onlineUsers.push(Object.values(onlineUsers)[0])
    })

    return onlineUsers
    

}