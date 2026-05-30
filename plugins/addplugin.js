  const fs = require("fs")
const path = require("path")

module.exports = {
    command: ["addplugin", "addpluing"],

    async run(sock, m, { text }) {

        if (!text) return m.reply("format:\naddplugin nama.js | kode plugin")

        try {

            let [filename, ...codeArr] = text.split("|")
            if (!filename || !codeArr.length) {
                return m.reply("format salah!\ncontoh:\naddplugin test.js | module.exports = {}")
            }
            filename = filename.trim()
            const code = codeArr.join("|").trim()
            if (!filename.endsWith(".js")) {
                filename += ".js"
            }
            const pluginDir = path.join(__dirname)
            const filePath = path.join(pluginDir, filename)
            if (fs.existsSync(filePath)) {
                return m.reply("plugin sudah ada ❌")
            }
            fs.writeFileSync(filePath, code)
            m.reply(
                `Plugin berhasil dibuat ✅\n\nFile: ${filename}\n\nBot akan auto-load (kalau fs.watch aktif)`
            )
        } catch (err) {
            console.error(err)
            m.reply("gagal bikin plugin ❌")
        }
    }
}