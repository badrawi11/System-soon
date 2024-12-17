const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
const { GatewayIntentBits, Integration } = require('discord.js');
const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ActivityType,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,ApplicationCommandOptionType
} = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const config = require('./config.json');
const rolesallowed = config.roles
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

client.on('ready', async () => {
  const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'setup',
    description: 'setup Apply',
  },
  {
    name: "block",
    description: "Block user from using command",
    options: [
      {
        name: "block",
        description: "Please Mention User to block",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "remove-block",
    description: "Remove block from user",
    options: [
      {
        name: "remove-block",
        description: "Please Mention User to remove block",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },  
];
function msg() { 
 let status = [`Invisible`];/// هنا تغير الحالة 
 let S = Math.floor(Math.random() * status.length);
 client.user.setActivity(status[S],{ type : 'WATCHING'})
};
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

//  await rest.put(Routes.applicationCommands(config.idbot), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
  console.log(`Logged in as ${client.user.tag}!`);
});

const fs = require('fs');

let blocklist = [];

try {
  const data = fs.readFileSync('blocklist.json', 'utf8');
  blocklist = JSON.parse(data);
} catch (err) {
  console.error('خطأ في قراءة الملف او الملف غير موجود قم بأنشاء الملف ووضع []', err);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'block') { 
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
      !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
    ) {
      return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
    }
    const member1 = interaction.options.getMember('block'); 

    if (!member1) {
      return interaction.reply('منشن شخص لـ حظره من الامر'); 
    }

    if (blocklist.includes(member1.id)) { 
      return interaction.reply('هذا الشخص محظورأ!');
    }
    interaction.reply(`تم حظر الشخص بنجاح ${member1}.`); 

    blocklist.push(member1.id); 

    fs.writeFileSync('blocklist.json', JSON.stringify(blocklist)); 
  }
    if (interaction.commandName === 'remove-block') { 
      if (
        !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
      ) {
        return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
      }
      let userToRemove = interaction.options.getMember('remove-block'); 
      if (!userToRemove) return interaction.reply('منشن شخص لإزالة الحظر منه'); 
      const index = blocklist.indexOf(userToRemove.id); 
      if (index !== -1) {
        try {
          await interaction.reply(`تم إزالة الحظر من الشخص بنجاح ${userToRemove}.`);
          blocklist.splice(index, 1);
          fs.writeFileSync('blocklist.json', JSON.stringify(blocklist));
        } catch (err) {
          console.error(err);
          return interaction.followUp(":x: حدث خطأ أثناء معالجة الطلب.");
        }
      } else {
        interaction.reply(`${userToRemove} هذا الشخص ليس محظورًا.`)
          .catch(err => console.error(err));
      }
    }
})



client.on('interactionCreate',async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'setup') {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
      !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
    ) {
      return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
    }
      const embed = new EmbedBuilder()
      .setTitle("IraqParadise Staff Submission - تقديم ادارة عراق بردايس")
      .setDescription('مرحباً! أرى أنك تريد التقديم على إدارة "عراق بردايس". يمكنك التقديم من خلال الضغط على الزر الذي في الأسفل. ويجب قراءة القوانين قبل التقديم من أجل ضمان قبولك في الإدارة.')
      .setThumbnail('https://cdn.discordapp.com/attachments/1309699830570024991/1313920638825791629/image0.gif?ex=67548673&is=675334f3&hm=a0f9e06f7f8d9de1a3ed1c5c510cdb8be9a0680f6fab37d4502fc3a89461391c&')
      .setImage('https://cdn.discordapp.com/attachments/1309699830570024991/1313920638104240159/BannerDiscord.gif?ex=67548673&is=675334f3&hm=5a28c2c03356dbb9664722b4c880bfa62aff8dab4c7ae1b61bf745d8b7fb1fb8&')
      .setColor(config.embedcolor)
      .addFields(
            { name: 'قوانين المدينة', value: '<#1164662648080707604>.', inline: true },
            { name: 'قوانين السيناريوهات', value: '<#1309699901935976489>.', inline: true },
            { name: 'قوانين الادارة', value: '<#1309699887046328360>.', inline: true }
        )
      const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setLabel(config.title)
          .setEmoji(config.p1)
          .setCustomId('apply')
      )
      await interaction.channel.send({
          embeds: [embed],
          components: [row]
      })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
      if (interaction.customId === 'apply') {
        if (blocklist.includes(interaction.user.id)) {
          await interaction.reply({content:'أنت على محظور من التقديم ولا يمكنك التقديم ابدا .',ephemeral:true});
          return;
        }    
          const modal = new ModalBuilder()
          .setTitle('IraqParadaise Staff Submission')
          .setCustomId('staff_apply')
          const nameComponent = new TextInputBuilder()
          .setCustomId('q1')
          .setLabel(`${config.q1}`)
          .setPlaceholder('ابو جاسم')
          .setMinLength(2)
          .setMaxLength(25)
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
          const ageComponent = new TextInputBuilder()
          .setCustomId('q2')
          .setLabel(`${config.q2}`)
          .setPlaceholder('99')
          .setMinLength(1)
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const whyYou = new TextInputBuilder()
          .setCustomId(`q3`)
          .setLabel(`${config.q3}`)
          .setPlaceholder('0')
          .setMinLength(1)
          .setMaxLength(120)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const q4 = new TextInputBuilder()
          .setCustomId('q4')
          .setLabel(`${config.q4}`)
          .setPlaceholder('قبول التكات و.....')
          .setMaxLength(400)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          const q5 = new TextInputBuilder()
          .setCustomId('q5')
          .setLabel(`${config.q5}`)
          .setPlaceholder('من ال 6 صباحا الئ ال 12 عصرا')
          .setMaxLength(400)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          const rows = [nameComponent, ageComponent,whyYou,q4,q5].map(
              (component) => new ActionRowBuilder().addComponents(component)
          )
          modal.addComponents(...rows);
          interaction.showModal(modal);
      }
      if (interaction.customId === 'staff_accept') {
        if (
         !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
        }
        const getIdFromFooter = interaction.message.embeds[0].footer.text;
        const getMember = await interaction.guild.members.fetch(getIdFromFooter);
        try {
          await getMember.send('ألف مبروك! تمت الموافقة على تقديم الخاص بك.https://discord.gg/pRCGcHvA',
                             'https://discord.gg/pRCGcHvA' );
        } catch (error) {
          console.error('فشل في إرسال رسالة للمستخدم:', error);
        }
        try {
          await getMember.roles.add(config.staffid);
        } catch (err) {
          console.error(err);
          return interaction.reply({
            content: ":x: لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات.",
          });
        }      
          await interaction.reply({
              content: `${config.yesmessage} ${getMember.user}`
          })
          const newDisabledRow = new ActionRowBuilder()
          .setComponents(
              new ButtonBuilder()
              .setCustomId('staff_accept_ended')
              .setDisabled()
              .setStyle(ButtonStyle.Success)
              .setEmoji("✅")
              .setLabel('قبول')
          )
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_deny_ended')
              .setDisabled()
              .setEmoji("❌")
              .setStyle(ButtonStyle.Secondary)
              .setLabel('رفض')
          )
          .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_block')
            .setEmoji("🚫")
            .setDisabled()
            .setStyle(ButtonStyle.Danger)
            .setLabel('حظر')
        )
          interaction.message.edit({ components: [newDisabledRow] })
      }
      if (interaction.customId === 'staff_deny') {
        if (
          !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
        }
          const getIdFromFooter = interaction.message.embeds[0].footer?.text;
          const getMember = await interaction.guild.members.fetch(getIdFromFooter);
          await interaction.reply({
              content: `${config.nomessage} ${getMember.user}.`
          })
          try {
            await getMember.send('للأسف، تم رفض طلبك. نتمنى لك حظًا أفضل في المرة القادمة.');
          } catch (error) {
            console.error('فشل في إرسال رسالة للمستخدم:', error);
          }
        try {
          await getMember.roles.add(config.id);
        } catch (err) {
          console.error(err);
          return interaction.reply({
            content: ":x: حدث خطأ، لا يمكن تنفيذ العملية.",
          });
          }
          const newDisabledRow = new ActionRowBuilder()
          .setComponents(
            new ButtonBuilder()
            .setCustomId('staff_accept_ended')
            .setDisabled()
            .setStyle(ButtonStyle.Success)
            .setEmoji("✅")
            .setLabel('قبول')
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_deny_ended')
            .setDisabled()
            .setEmoji("❌")
            .setStyle(ButtonStyle.Secondary)
            .setLabel('رفض')
        )
        .addComponents(
          new ButtonBuilder()
          .setCustomId('staff_block')
          .setEmoji("🚫")
          .setDisabled()
          .setStyle(ButtonStyle.Danger)
          .setLabel('حظر')
      )
          interaction.message.edit({ components: [newDisabledRow] })
      }
      if (interaction.customId === 'staff_block') {
        if (
          !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك مو اداري يله ولي.",ephemeral:true});
        }
        const getIdFromFooter = interaction.message.embeds[0].footer?.text;
        const getMember = await interaction.guild.members.fetch(getIdFromFooter);
        if (blocklist.includes(getMember.id)) {
          return interaction.reply('هذا المستخدم موجود بالفعل في قائمة الحظر.');
        }
        interaction.reply("تم حظر المستخدم من التقديم بشكل كامل")

        blocklist.push(getMember.id);
    
        fs.writeFileSync('blocklist.json', JSON.stringify(blocklist));
      }
  }
  if (interaction.isModalSubmit()) {
      if (interaction.customId === 'staff_apply') {
          const q1 = interaction.fields.getTextInputValue('q1');
          const q2 = interaction.fields.getTextInputValue('q2');
          const q3 = interaction.fields.getTextInputValue('q3');
          const q4 = interaction.fields.getTextInputValue('q4');
          const q5 = interaction.fields.getTextInputValue('q5');
          interaction.reply({
              content: `${config.donesend}`,
              ephemeral: true
          })
          const staffSubmitChannel = interaction.guild.channels.cache.get(config.staffroom);
          if (!staffSubmitChannel) return;
          const embed = new EmbedBuilder()
          
          .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
          .setColor(config.embedcolor)
          .setFooter({ text: interaction.user.id })
          .setTimestamp()
          .setThumbnail('https://cdn.discordapp.com/attachments/1309699830570024991/1313920638825791629/image0.gif?ex=67548673&is=675334f3&hm=a0f9e06f7f8d9de1a3ed1c5c510cdb8be9a0680f6fab37d4502fc3a89461391c&')
          .setImage('https://cdn.discordapp.com/attachments/1309699830570024991/1313920638104240159/BannerDiscord.gif?ex=67548673&is=675334f3&hm=5a28c2c03356dbb9664722b4c880bfa62aff8dab4c7ae1b61bf745d8b7fb1fb8&')
          .addFields(
              {
                  name: `${config.title11}`,
                  value: `<@${interaction.user.id}>`,
              },
              {
                  name: `${config.w1}`,
                  value: `\`\`\`\n${q1}\`\`\``,
              },
              {
                  name: `${config.w2}`,
                  value: `\`\`\`\n${q2}\`\`\``,
              },
              {
                  name: `${config.w3}`,
                  value: `\`\`\`\n${q3}\`\`\``,
              },
              {
                  name: `${config.w5}`,
                  value: `\`\`\`\n${q4}\`\`\``,
              },
              {
                  name: `${config.w4}`,
                  value: `\`\`\`\n${q5}\`\`\``,
              }
          )
          const row = new ActionRowBuilder()
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_accept')
              .setLabel('قبول')
              .setEmoji("✅")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_deny')
              .setLabel('رفض')
              .setEmoji("❌")
              .setStyle(ButtonStyle.Secondary)
          )
          .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_block')
            .setEmoji("🚫")
            .setStyle(ButtonStyle.Danger)
            .setLabel('حظر')
        )
          staffSubmitChannel.send({
              embeds: [embed],
              components: [row]
          })
      }
  }
})
client.login(process.env.TOKEN)



// اذا تبغى تضيف توكن زياده روح حطها تحت عند التوكن بس مو اخر سطر قبل الاخير او الثاني وكتبها بكتبلك ياه تحت
//'',
const tokens = [
  '',

    '',
    '',
    '',
    '',
    ''
];

function createBot(token) {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds]
  });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`code by ABU JASSIM`);

//هاذي الستريمنق تخلي كل بوتاتك الستريمنق ولا تنسى تعدل كلمة سانيقو وتحط الكلام الي تبغاها اذا ما تبيها احذفها
        client.user.setActivity('Iraq Paradise On Top',{
            type: ActivityType.Playing,
            url: 'https://cfx.re/join/br87ob' 
        });
    });

//لا تلمس الي تحت لا تخرب شي عشان ما اتضارب معك

    client.login(token).catch(error => {
        console.error(`Failed to login with token: ${token}. Error: ${error.message}`);
    });
}

tokens.forEach(token => {
    createBot(process.env.TOKEN);
});


            //ActivityType.Watching,
            //ActivityType.Listening,
            //ActivityType.Competing,
            //ActivityType.Streaming,
            //ActivityType.Custom,




client.once("ready", () => {
  console.log(`bot is ready! ${client.user.tag}!`);
  console.log(`Code by Iraq Paradise On Top`);
  console.log(`@discord.gg/xa`);

  const statusType = "invisible"; // online = الاخضر | dnd = الاحمر | idle = الاصفر | invisible = غير متصل
  client.user.setPresence({
    status: statusType,
    activities: [
      {
        name: "Iraq Paradise On Top", // الاسم
        type: ActivityType.playing, // streaming | playing | listening
        url: "https://www.twitch.tv/", // stream link
      },
    ],
  });
});



const TOKEN = (process.env.TOKEN); // استبدلها بتوكن البوت الخاص بك.
const VOICE_CHANNEL_ID = '1191847283029975074'; // استبدلها بـ ID القناة الصوتية.

client.once('ready', () => {
    console.log(`تم تسجيل الدخول كبوت: ${client.user.tag}`);

    // الانضمام إلى القناة الصوتية
    const voiceChannel = client.channels.cache.get(VOICE_CHANNEL_ID);

    if (!voiceChannel || voiceChannel.type !== 2) { // 2 يعني Voice Channel
        console.error('تأكد من أن ID القناة صحيح وأنها قناة صوتية!');
        return;
    }

    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    console.log(`تم الانضمام إلى القناة الصوتية: ${voiceChannel.name}`);
});

client.login(process.env.TOKEN); //توكن بوت بدال Token












// توكنك هنا لا تنسى تغير
// ايدي الروم اللي بينرسل بها الاذكار
const CHANNEL_ID = '1191847283222921234';

// الاذكار ، تقدر تزيدهم
const azkar = [
    //"سبحان الله وبحمده، سبحان الله العظيم",
    //"لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    //"اللهم صل وسلم على نبينا محمد",
    //"استغفر الله العظيم واتوب إليه",
    //"لا حول ولا قوة إلا بالله العلي العظيم",
   // "الحمد لله رب العالمين",
   // "سبحان الله عدد ما خلق في السماء، سبحان الله عدد ما خلق في الأرض",
   // "اللهم إنك عفو تحب العفو فاعف عني",
   // "رب اغفر لي وتب علي إنك أنت التواب الرحيم",
   // "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين",
    //"لا إله إلا الله محمد رسول الله",
    //"اللهم اجعلنا من الذاكرين الشاكرين",
    "اللهم ارزقني حبك وحب من يحبك وحب كل عمل يقربني إلى حبك"
];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    
    function sendRandomAzkar() {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            const randomAzkar = azkar[Math.floor(Math.random() * azkar.length)];
            channel.send(randomAzkar);
        } else {
            console.log("Channel not found");
        }
    }

    setInterval(sendRandomAzkar, 1800000);
});




