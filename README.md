# Hubot Rocket.Chat Attachment

Rocket.Chat attachment like [Slack](https://api.slack.com/docs/message-attachments).

## Installation

```
  npm install -S hubot-rocketchat-attachment
```

And then add hubot-rocketchat-attachment to external-scripts.json.

## Run

```
  HUBOT_ROCKETCHAT_INCOMING_WEBHOOK=INCOMING-WEBHOOK-URL bin/hubot -a rocketchat
```

## Usage

Let see [this page](https://rocket.chat/docs/administrator-guides/integrations/).

```
robot.emit('rocketchat.attachment', {
  content: {
    text: 'content text',
    attachments: [
      {
        text: 'attachment text',
        fields: [{
          title: 'Field title',
          value: 'Field value'
        }]
      }
    ]
  },
  channel: '#general',
  username: '...',
  icon_url: '...',
  icon_emoji: '...'
})
```

## Contribute

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
