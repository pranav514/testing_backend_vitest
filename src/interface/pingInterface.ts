export interface Ping{
    message : string,
    postId : string,
    userId : string
}

export interface PingCreate extends Ping{
}