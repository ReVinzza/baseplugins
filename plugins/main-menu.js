 const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
    command: ['menu', 'help'], 
    isGroup: false,            
    isOwner: false,            

    run: async (sock, m, { prefix, isPremium, isOwner }) => {
        try {
            await sock.sendMessage(m.chat, { react: { text: '😹', key: m.key } });

            const pushname = m.pushName || "No Name";
            const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss');
            const statusUser = isOwner ? 'Owner' : isPremium ? 'Premium' : 'User';

            let teks = `
╭「 \`${pushname}\` 」

╭「 *ᐯㄖ尺₮卄ㄚ乂* 」
│
│◧ *ᴀᴜᴛʜᴏʀ:* ʀᴇᴠɪɴᴢᴀ
│◧ *ʙᴏᴛɴᴀᴍᴇ:* ᴠᴏʀᴛʜʏx
│◧ *ᴠᴇʀꜱɪᴏɴ:* ɴᴇᴡ
│◧ *ᴛʏᴘᴇ:* ᴘʟᴜɢɪɴs
│◧ *ᴘʀᴇғɪx:* [ ${prefix} ]
│◧ *ᴛɪᴍᴇ:* ${wib} WIB
│◧ *ꜱᴛᴀᴛᴜꜱ:* ${statusUser}
╰───────────────☣︎


 ${prefix}grupmenu


Precision over chaos. Execute with intent.
`;
            if (fs.existsSync("./menu.jpg")) {
                let rvnz = fs.readFileSync("./menu.jpg");
                await sock.sendMessage(m.chat, {
                    image: rvnz,
                    caption: teks
                }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: teks }, { quoted: m });
            }

            if (fs.existsSync("./menu.mp3")) {
                let rvnzaudio = fs.readFileSync("./menu.mp3");
                await sock.sendMessage(m.chat, {
                    audio: rvnzaudio,  
                    mimetype: "audio/mpeg",
                    ptt: true
                }, { quoted: m });
            }

        } catch (err) {
            console.error("Error di plugin menu kustom:", err);
            m.reply("Terjadi kesalahan saat memproses menu.");
        }
    }
};