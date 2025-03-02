const { EmbedBuilder, PermissionsBitField } = require("discord.js");
require("dotenv").config();

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    const linkRegex = /(https?:\/\/[^\s]+)/g;
    if (linkRegex.test(message.content)) {
        if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

        try {
            await message.member.timeout(3600000);

            await message.delete();

            const logChannelID = process.env.LOG_CHANNEL_ID;
            const logChannel = client.channels.cache.get(logChannelID);

            if (logChannel) {
                const embed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle("🚨 **Link Blocked**")
                    .setDescription(`🔗 **The user <@${message.author.id}> tried to send a link.**`)
                    .addFields(
                        { name: "📌 User", value: `<@${message.author.id}>`, inline: true },
                        { name: "🕒 Hour", value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
                        { name: "🔗 Message", value: `\`\`\`${message.content}\`\`\`` }
                    )
                    .setFooter({ text: "AntiLink System", iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();

                logChannel.send({ embeds: [embed] }).catch(() => {});
            }

        } catch (error) {
            console.error("❌ Error handling link message:", error);
        }
    }
};
