const { Client } = require('discord.js')
const ytdl = require('ytdl-core')
const yts = require( 'yt-search' )
const { title } = require('process')
const google = require('google')
const pre = '3'

const client = new Client({ disableEveryone: true })

client.on('ready', async () => {
    console.log('Ready mzster')
    client.user.setStatus('dnd')
        console.log('Status ok')
    setTimeout(()=> {
        client.user.setActivity(`Prefix : ${pre}`)
    console.log('Set Activity ok')
    }, 100)
    
})

//help
client.on('message', async  message => {
    if(message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}help`)){
        message.channel.send('Vous  pouvez ;syt cherche sur youtube')
         message.channel.send(';play url poure mettre la chanson et ;stop pour')
    }  
})
// delete
client.on('message', async  message => {
    if(message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}dl`)){
        message.channel.bulkDelete(1)
           message.channel.bulkDelete(args[1])
       
    }
})

//Music
client.on('message', async message => {
    if(message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}play`)){
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return('You need to connect a voice channel please!😉')
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return('I don\'have permissions to connect to the voice channel')
        if(!permissions.has('SPEAK')) return('I can\'t speak in the channel.')
        
        try{
            var connection =  await voiceChannel.join()
        }catch(error){
            console.log(`There are an error : ${error}`)
            message.channel.send(`There are an error: ${error}`)
        }

        const dispatcher = connection.play(ytdl(args[1]))
        .on('finish', () => {
            voiceChannel.leave()
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
    }else if (message.content.startsWith(`${pre}stop`)){
        if(!message.member.voice.channel) return('You need to in a voice channel')
        message.member.voice.channel.leave()
        return undefined
    }
})

//Math multiplier
client.on('message', async message => {
    if (message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}math*`)){
        message.channel.send(`The resultat is : ${args[1]*args[2]}`)
    }
})

//Math plus
client.on('message', async message => {
    if (message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}math+`)){
        message.channel.send(`The resultat is : ${args[1]+args[2]}`)
    }
})

//Math moins
client.on('message', async message => {
    if (message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}math-`)){
        message.channel.send(`The resultat is : ${args[1]-args[2]}`)
    }
})

//Math divis
client.on('message', async message => {
    if (message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}math/`)){
        message.channel.send(`The resultat is : ${args[1]/args[2]}`)
    }
})

//search youtube
client.on('message', async message => {
    if(message.author.bot) return
    if(!message.content.startsWith(pre)) return

    const args = message.content.substring(pre.length).split(" ")

    if(message.content.startsWith(`${pre}syt`)){
        
        const r = await yts(`${message.content.slice(5)}`)
        const videos = r.videos.slice( 0, 5 )

        videos.forEach( function ( v ) {
            const views = String( v.views ).padStart( 10, ' ' )
           const l = ( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name } | ${v.url}` )
           message.channel.send(l)
        } )
       

    }

    
})


//token
client.login(process.TOKEN)