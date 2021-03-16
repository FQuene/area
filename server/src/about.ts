const about = {
    client: {
        host: '',
    },
    server: {
        current_time: 1111,
        services: [
            {
                name: 'Timer',
                actions: [
                    {
                        name: 'Date',
                        description: 'Check if a date has been reached',
                    },
                    {
                        name: 'Heure',
                        description: 'Check if a hour has been reached',
                    },
                ],
                reactions: [],
            },
            {
                name: 'Twitch',
                actions: [
                    {
                        name: 'En live',
                        description: 'Check if a streamer is living',
                    },
                ],
                reactions: [
                    {
                        name: 'Abonnement',
                        description: 'Subscribe to a channel',
                    },
                ],
            },
            {
                name: 'Weather',
                actions: [
                    {
                        name: 'Température',
                        description: 'Check if a temperature has been reached',
                    },
                    {
                        name: 'Température ressentie',
                        description: 'Check if a felt temperature has been reached',
                    },
                    {
                        name: 'Humidité',
                        description: 'Check if a humidity has been reached',
                    },
                    {
                        name: 'Vitesse du vent',
                        description: 'Check if a wind speed has been reached',
                    },
                ],
                reactions: [],
            },
            {
                name: 'Notifs',
                actions: [],
                reactions: [
                    {
                        name: 'Notification',
                        description: 'Send a notification to',
                    },
                ],
            },
            {
                name: 'Spotify',
                actions: [
                    {
                        name: 'Une musique a été écouté ',
                        description: 'Check if a music has been listen',
                    },
                ],
                reactions: [],
            },
            {
                name: 'Mail',
                actions: [],
                reactions: [
                    {
                        name: 'Envoyer un mail',
                        description: 'Send a mail',
                    },
                ],
            },
            {
                name: 'Mobile',
                actions: [],
                reactions: [
                    {
                        name: 'Appel',
                        description: 'Call someone',
                    },
                    {
                        name: 'SMS',
                        description: 'Text to someone',
                    },
                ],
            },
            {
                name: 'Discord',
                actions: [],
                reactions: [
                    {
                        name: 'Envoyer un message',
                        description: 'Send a message to channel',
                    },
                ],
            },
            {
                name: 'Instagram',
                actions: [
                    {
                        name: "Quelqu'un suit le compte ",
                        description: 'Check if someone follows the account',
                    },
                    {
                        name: "Quelqu'un ne suit plus le compte",
                        description: 'Check if someone stopped following the account',
                    },
                    {
                        name: "Le compte suit quelqu'un",
                        description: 'Check if the account follows someone',
                    },
                    {
                        name: "Le compte ne suit plus quelqu'un",
                        description: 'Check if the account stopped following someone',
                    },
                ],
                reactions: [],
            },
        ],
    },
};

export default about;
