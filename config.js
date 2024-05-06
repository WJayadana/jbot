const fs = require("fs")

global.owner = ["6285162822778"]
global.ownerName = "Jayadana"
global.botName = "Jayadana Bot"
global.titleMenu = "Jayadana Bot Preview Version"
global.desk = "Whatsapp Bot Created Using Baileys Latest Version"

global.ghOwner = "https://github.com/WJayadana/jbot"

//watermark 
global.packname = 'Created by'
global.author = 'Jayadana Bot'
global.thumb = 'https://i.ibb.co/crL4nMY/thumb.jpg' // Your Thumbnail

global.nTiktok = "6285574670496@s.whatsapp.net"
global.nWhatsapp = "0@s.whatsapp.net"
global.nWhatsapp1 = "1@s.whatsapp.net"
global.nWhatsapp2 = "2@s.whatsapp.net"
global.nWhatsapp3 = "3@s.whatsapp.net"
global.nWhatsapp4 = "4@s.whatsapp.net"
global.nFacebook = "447974045725@s.whatsapp.net"
global.nInstagram = "12066409886@s.whatsapp.net"
global.nCimbNiaga = "6281197814041@s.whatsapp.net"
global.nNeoCom = "6285945821772@s.whatsapp.net"
global.nMega = "6282208223401@s.whatsapp.net"
global.nBca = "628111500998@s.whatsapp.net"
global.nOvo = "6285574670348@s.whatsapp.net"
global.nMyRep = "6288981500818@s.whatsapp.net"
global.nAdaOtp = "62881011651447@s.whatsapp.net"
global.nNusa = "6282249247464@s.whatsapp.net"
global.nVivo = "6281197601111@s.whatsapp.net"
global.nFastWork = "6282211590250@s.whatsapp.net"
global.nRuangGuru = "6281578200000@s.whatsapp.net"
global.nBlibli = "628041871871@s.whatsapp.net"
global.nPlazaIndo = "628111338388@s.whatsapp.net"
global.nJnT = "6285179866886@s.whatsapp.net"
global.nKitaBisa = "628111319004@s.whatsapp.net"
global.nLayananPengaduan = "62811737110@s.whatsapp.net"
global.nBareskrim = "62895620460007@s.whatsapp.net"
global.nKominfo = "628953218011107@s.whatsapp.net"
global.nPosIndonesia = "6281224890096@s.whatsapp.net"
global.nPoldaMetroJaya = "6281324410007@s.whatsapp.net"
global.nPlnM = "6281110281237@s.whatsapp.net"
global.nShopeeP = "622150942336@s.whatsapp.net"
global.nTelkomsesl = "6281283981677 @s.whatsapp.net"
global.nTelkomsel = "6281111111111@s.whatsapp.net"


global.mess = {
    success: 'Done',
    admin: 'Sorry, only group admins can use this command.',
    botAdmin: 'This command can only be used when the bot is a group admin.',
    owner: 'Sorry, only the bot owner can use this command.',
    group: 'This command can only be used in group chat.',
    private: 'This command can only be used in private chat.',
    wait: 'Waitt....',
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});
