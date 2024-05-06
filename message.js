/*
 * This base is free
 * by chocozy
 * dont sell
 */

require("./config.js");
const fs = require("fs");
const axios = require("axios");
const { exec, spawn, execSync } = require("child_process");
const fetch = require("node-fetch");

const {
  generateWAMessageFromContent,
  proto,
  downloadContentFromMessage,
} = require("@whiskeysockets/baileys");

const {
  getGroupAdmins,
  jsonformat,
  generateProfilePicture,
  getBuffer,
} = require("./lib/lib.js");

const path = require("path");

const mess = JSON.parse(fs.readFileSync("./jawaban.json"));

module.exports = async (jayadana, m) => {
  try {
    const body =
      (m.mtype === "conversation" && m.message.conversation) ||
      (m.mtype === "imageMessage" && m.message.imageMessage.caption) ||
      (m.mtype === "documentMessage" && m.message.documentMessage.caption) ||
      (m.mtype === "videoMessage" && m.message.videoMessage.caption) ||
      (m.mtype === "extendedTextMessage" &&
        m.message.extendedTextMessage.text) ||
      (m.mtype === "buttonsResponseMessage" &&
        m.message.buttonsResponseMessage.selectedButtonId) ||
      (m.mtype === "templateButtonReplyMessage" &&
        m.message.templateButtonReplyMessage.selectedId)
        ? (m.mtype === "conversation" && m.message.conversation) ||
          (m.mtype === "imageMessage" && m.message.imageMessage.caption) ||
          (m.mtype === "documentMessage" &&
            m.message.documentMessage.caption) ||
          (m.mtype === "videoMessage" && m.message.videoMessage.caption) ||
          (m.mtype === "extendedTextMessage" &&
            m.message.extendedTextMessage.text) ||
          (m.mtype === "buttonsResponseMessage" &&
            m.message.buttonsResponseMessage.selectedButtonId) ||
          (m.mtype === "templateButtonReplyMessage" &&
            m.message.templateButtonReplyMessage.selectedId)
        : "";

    const budy = typeof m.text === "string" ? m.text : "";
    const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
    const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ".";
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const sender = m.key.fromMe
      ? jayadana.user.id.split(":")[0] + "@s.whatsapp.net" || jayadana.user.id
      : m.key.participant || m.key.remoteJid;
    const botNumber = await jayadana.decodeJid(jayadana.user.id);
    const senderNumber = sender.split("@")[0];
    const fromMe = m.key.fromMe;
    const pushname = m.pushName || `${senderNumber}`;
    const isBot = botNumber.includes(senderNumber);
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.m || quoted).mimetype || "";
    const qmsg = quoted.m || quoted;
    const isCreator =
      (m &&
        m.sender &&
        [botNumber, ...global.owner]
          .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
          .includes(m.sender)) ||
      false;

    const groupMetadata = m.isGroup
      ? await jayadana.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const isGroupOwner = m.isGroup
      ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
      : false;

    const thumb = fs.readFileSync("./gambar/heheh.jpg");

    // INI UNTUK QUOTED
    const JFKontak = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(sender ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        contactMessage: {
          displayName: `Hallo ${pushname}\n`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;Jayadana,;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${
            sender.split("@")[0]
          }:${sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: { url: `${global.thumb}` },
        },
      },
    };

    const JFLokasi = {
      key: {
        fromMe: false,
        participant: `${global.nWhatsapp}`,
        ...(sender ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        locationMessage: {
          location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221,
            name: "gehhehe",
          },
        },
      },
    };

    // INI UNTUK CONTEXT INFO

    const JFLink = {
      forwardingScore: 9999,
      isForwarded: true,
      mentionedJid: [sender],
      forwardedNewsletterMessageInfo: {
        newsletterName: "Bot Dibuat Oleh Jayadana",
        newsletterJid: "120363182351520831@newsletter",
      },
      externalAdReply: {
        showAdAttribution: true,
        title: `Title`,
        mediaType: 1,
        body: `Description`,
        thumbnail: thumb,
        renderLargerThumbnail: true,
        mediaUrl: "https://github.com/WJayadana/jbot",
        sourceUrl: `https://github.com/WJayadana/jbot`,
      },
    };

    const JIFull = {
      forwardingScore: 9999,
      isForwarded: true,
      actionLink: {
        buttonTitle: "Anwa",
        url: "https://wa.me/6285162822778",
      },
      externalAdReply: {
        showAdAttribution: true, //Kalau Ini diaktifkan nanti jadi Kirim Pesan Melalui
        title: `Title`,
        mediaType: 1,
        body: `Description`,
        previewType: 2,
        thumbnail: thumb,
        renderLargerThumbnail: true,
        mediaUrl: "https://github.com/WJayadana/jbot",
        sourceUrl: `https://github.com/WJayadana/jbot`,
      },
    };
    const reply = (text) => {
      jayadana.sendMessage(
        m.chat,
        { text: text, contextInfo: JIFull },
        { quoted: JFKontak }
      );
    };

    const jayadanareply = (text) => {
      jayadana.sendMessage(
        m.chat,
        {
          text: text,
          contextInfo: {
            forwardingScore: 9999,
            isForwarded: true,
            mentionedJid: [sender],
            forwardedNewsletterMessageInfo: {
              newsletterName: "Bot Dibuat Oleh Jayadana",
              newsletterJid: "120363182351520831@newsletter",
            },
            externalAdReply: {
              showAdAttribution: true,
              title: global.titleMenu,
              mediaType: 1,
              body: global.desk,
              thumbnail: thumb,
              renderLargerThumbnail: true,
              mediaUrl: global.ghOwner,
              sourceUrl: global.ghOwner,
            },
          },
        },
        { quoted: JFKontak }
      );
    };

    if (isCmd)
      console.log(
        "~> [CMD]",
        command,
        "from",
        pushname,
        "in",
        m.isGroup ? "Group Chat" : "Private Chat",
        "[" + args.length + "]"
      );

    switch (command) {
      case "eee":
        {
          let menu = `lo`;
          jayadana.sendMessage(
            m.chat,
            {
              text: menu,
              contextInfo: JFLink,
            },
            { quoted: JFKontak }
          );
        }
        break;

      case "testp":
        let teks = `lo`;
        jayadana.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: JIFull,
          },
          {
            quoted: JFLokasi,
          }
        );
        break;

      case "status":
        const xmenu_oh = "hahaha";
        jayadana.relayMessage(
          m.chat,
          {
            requestPaymentMessage: {
              currencyCodeIso4217: "IDR",
              amount1000: "9999999900",
              requestFrom: m.sender,
              noteMessage: {
                extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                    externalAdReply: {
                      showAdAttribution: true,
                    },
                  },
                },
              },
            },
          },
          {}
        );

        break;

      case "y":
        let monce = m.quoted.message;

        let type = Object.keys(monce)[0];
        let media = await downloadContentFromMessage(
          monce[type],
          type == "imageMessage" ? "image" : "video"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        if (/video/.test(type)) {
          return await jayadana.sendMessage(
            m.chat,
            { video: buffer, caption: mess.caption.vone },
            { quoted: JFKontak }
          );
        } else if (/image/.test(type)) {
          return await jayadana.sendMessage(
            m.chat,
            { image: buffer, caption: mess.caption.vone },
            { quoted: JFKontak }
          );
        }
        // console.log(m.quoted.message.viewOnceMessageV2)
        break;

      case "yy":
        await jayadana.sendMessage(
          m.chat,
          { image: { url: "./gambar/mamak.jpg" }, mimetype: "image/png" },
          { quoted: JFKontak }
        );
        break;

      case "ev":
        if (!isCreator) return reply("su asu");
        if (!q) return reply("hehehe");

        try {
          let evaled = await eval(q);
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          //reply(`>> ${evaled}`);
        } catch (err) {
          console.error(err);
          // reply(`» Error: ${err.message}`);
        }

        break;
      case "test":
        jayadana.sendMessage(
          m.chat,
          {
            video: "./Media/ma_gif.mp4",
            caption: "hello!",
            gifPlayback: true,
            contextInfo: {
              forwardingScore: 9999,
              isForwarded: true,
              mentionedJid: [sender],
              forwardedNewsletterMessageInfo: {
                newsletterName: "Bot Dibuat Oleh Jayadana",
                newsletterJid: "120363182351520831@newsletter",
              },
              externalAdReply: {
                showAdAttribution: true,
                title: `Title`,
                mediaType: 1,
                body: `Description`,
                thumbnail: thumb,
                renderLargerThumbnail: true,
                mediaUrl: "https://github.com/WJayadana/jbot",
                sourceUrl: `https://github.com/WJayadana/jbot`,
              },
            },
          },
          { quoted: JFKontak }
        );
        break;

      case "b":
        let msg = generateWAMessageFromContent(
          m.chat,
          {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2,
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "header",
                    subtitle: "kepala",
                    hasMediaAttachment: false,
                    // jpegThumbnail: thumb,
                  }),
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: "Body nya",
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "© Jayadana Bot",
                  }),
                  nativeFlowMessage:
                    proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [
                        {
                          name: "single_select",
                          buttonParamsJson:
                            '{"title":"title","sections":[{"title":"title","highlight_label":"label","rows":[{"header":"header","title":"title","description":"description","id":"id"},{"header":"header","title":"title","description":"description","id":"id"}]}]}',
                        },
                        {
                          name: "cta_url",
                          buttonParamsJson:
                            '{"display_text":"url","url":"https://www.google.com","merchant_url":"https://www.google.com"}',
                        },
                      ],
                    }),
                }),
              },
            },
          },
          {
            quoted: jayadanaKontak,
          }
        );

        await jayadana.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id,
        });
        break;

      case "btn":
        let btnn = generateWAMessageFromContent(
          m.chat,
          {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2,
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: "test",
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "test",
                  }),
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "test",
                    subtitle: "test",
                    hasMediaAttachment: false,
                  }),
                  nativeFlowMessage:
                    proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [
                        {
                          name: "single_select",
                          buttonParamsJson:
                            '{"title":"title","sections":[{"title":"title","highlight_label":"label","rows":[{"header":"header","title":"title","description":"description","id":"id"},{"header":"header","title":"title","description":"description","id":"id"}]}]}',
                        },
                        {
                          name: "quick_reply",
                          buttonParamsJson:
                            '{"display_text":"quick_reply","id":"message"}',
                        },
                        {
                          name: "cta_url",
                          buttonParamsJson:
                            '{"display_text":"url","url":"https://www.google.com","merchant_url":"https://www.google.com"}',
                        },
                        {
                          name: "cta_call",
                          buttonParamsJson:
                            '{"display_text":"call","id":"message"}',
                        },
                        {
                          name: "cta_copy",
                          buttonParamsJson:
                            '{"display_text":"copy","id":"123456789","copy_code":"message"}',
                        },
                        {
                          name: "cta_reminder",
                          buttonParamsJson:
                            '{"display_text":"cta_reminder","id":"message"}',
                        },
                        {
                          name: "cta_cancel_reminder",
                          buttonParamsJson:
                            '{"display_text":"cta_cancel_reminder","id":"message"}',
                        },
                        // {
                        //   name: "address_message",
                        //   buttonParamsJson:
                        //     '{"display_text":"address_message","id":"message"}',
                        // },
                        {
                          name: "send_location",
                          buttonParamsJson: "",
                        },
                      ],
                    }),
                }),
              },
            },
          },
          {}
        );

        await jayadana.relayMessage(btnn.key.remoteJid, btnn.message, {
          messageId: btnn.key.id,
        });
        break;
    }
  } catch (err) {
    console.log(require("util").format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  delete require.cache[file];
  require(file);
});
