import iconTimer from '../../assets/icons/iconTimer.svg';
import iconTwitch from '../../assets/icons/iconTwitch.svg';
import iconWeather from '../../assets/icons/iconWeather.svg';
import iconNotifs from '../../assets/icons/iconNotification.svg';
import iconSpotify from '../../assets/icons/iconSpotify.svg';
import iconMail from '../../assets/icons/iconMail.svg';
import iconMobile from '../../assets/icons/iconMobile.svg';
import iconDiscord from '../../assets/icons/iconDiscord.svg';
import iconInstagram from '../../assets/icons/iconInstagram.svg';

const services = [
  {
    name: 'Timer',
    nameLowercase: 'timer',
    image: iconTimer,
    color: '#fd7272',
    hoverColor: 'rgb(205 91 91)',
    actions: [
      {
        name: 'Date ',
        actiondId: 'timer_action_date',
        params: [
          { name: '', type: 'calendar', value: 'DD/MM/YYYY', server: '' },
        ],
      },
      {
        name: 'Heure ',
        actiondId: 'timer_action_time',
        params: [{ name: '', type: 'time', value: 'HH/MM', server: '' }],
      },
    ],
    reactions: [],
  },
  {
    name: 'Twitch',
    nameLowercase: 'twitch',
    image: iconTwitch,
    color: '#A970FF',
    hoverColor: 'rgb(134 90 200)',
    actions: [
      {
        name: 'En live ',
        actiondId: 'twitch_action_channel_is_live',
        params: [
          { name: 'Nom de la chaîne', type: 'text', value: '', server: '' },
        ],
      },
    ],
    reactions: [
      {
        name: 'Abonnement ',
        reactiondId: 'twitch_reaction_follow',
        params: [
          { name: 'Nom de la chaîne', type: 'text', value: '', server: '' },
        ],
      },
    ],
  },
  {
    name: 'Weather',
    nameLowercase: 'weather',
    image: iconWeather,
    color: '#8D8D8D',
    hoverColor: 'rgb(122 122 122)',
    actions: [
      {
        name: 'Température ',
        actiondId: 'weather_action_temp_is',
        params: [
          { name: 'Ville', type: 'text', value: '', server: '' },
          { name: 'Température', type: 'text', value: '', server: '' },
        ],
      },
      {
        name: 'Température ressentie ',
        actiondId: 'weather_action_temp_feelslike_is',
        params: [
          { name: 'Ville', type: 'text', value: '', server: '' },
          { name: 'Température', type: 'text', value: '', server: '' },
        ],
      },
      {
        name: 'Humidité ',
        actiondId: 'weather_action_humidity_is',
        params: [
          { name: 'Ville', type: 'text', value: '', server: '' },
          { name: 'Humidité', type: 'text', value: '', server: '' },
        ],
      },
      {
        name: 'Vitesse du vent ',
        actiondId: 'weather_action_wind_is',
        params: [
          { name: 'Ville', type: 'text', value: '', server: '' },
          { name: 'Vent', type: 'text', value: '', server: '' },
        ],
      },
    ],
    reactions: [],
  },
  {
    name: 'Notifs',
    nameLowercase: 'notifs',
    image: iconNotifs,
    color: '#229EC6',
    hoverColor: 'rgb(31 138 173)',
    actions: [],
    reactions: [
      {
        name: 'Notification ',
        reactiondId: 'notifs_reaction_send',
        params: [
          { name: 'Titre', type: 'text', value: '', server: '' },
          { name: 'Message', type: 'area', value: '', server: '' },
        ],
      },
    ],
  },
  {
    name: 'Spotify',
    nameLowercase: 'spotify',
    image: iconSpotify,
    color: '#1DB954',
    hoverColor: 'rgb(25 153 70)',
    actions: [
      {
        name: 'Une musique a été écouté ',
        actiondId: 'spotify_action_last_music_listened_is',
        params: [
          { name: 'Artiste', type: 'text', value: '', server: '' },
          { name: 'Musique', type: 'text', value: '', server: '' },
        ],
      },
    ],
    reactions: [],
  },
  {
    name: 'Mail',
    nameLowercase: 'mail',
    image: iconMail,
    color: '#D95FB7',
    hoverColor: 'rgb(173 77 147)',
    actions: [],
    reactions: [
      {
        name: 'Envoyer un mail ',
        reactiondId: 'mail_reaction_send_mail',
        params: [
          { name: 'Destinataire', type: 'text', value: '', server: '' },
          { name: 'Objet', type: 'text', value: '', server: '' },
          { name: 'Message', type: 'area', value: '', server: '' },
        ],
      },
    ],
  },
  {
    name: 'Mobile',
    nameLowercase: 'mobile',
    image: iconMobile,
    color: '#FBC12C',
    hoverColor: 'rgb(208 160 37)',
    actions: [],
    reactions: [
      {
        name: 'Appel ',
        reactiondId: 'mobile_reaction_call',
        params: [
          { name: 'Numéro', type: 'text', value: '', server: '' },
          { name: 'Message', type: 'area', value: '', server: '' },
        ],
      },
      {
        name: 'SMS ',
        reactiondId: 'mobile_reaction_sms',
        params: [
          { name: 'Numéro', type: 'text', value: '', server: '' },
          { name: 'Message', type: 'area', value: '', server: '' },
        ],
      },
    ],
  },
  {
    name: 'Discord',
    nameLowercase: 'discord',
    image: iconDiscord,
    color: '#7289DA',
    hoverColor: 'rgb(94 113 177)',
    actions: [],
    reactions: [
      {
        name: 'Envoyer un message ',
        reactiondId: 'discord_send_webhook_message',
        params: [
          { name: 'Lien du Webhook', type: 'text', value: '', server: '' },
          { name: 'Message', type: 'area', value: '', server: '' },
        ],
      },
    ],
  },
  {
    name: 'Instagram',
    nameLowercase: 'instagram',
    image: iconInstagram,
    color: '#FF2063',
    hoverColor: 'rgba(204, 31, 83, 1)',
    actions: [
      {
        name: "Quelqu'un suit le compte ",
        actiondId: 'instagram_action_win_followers',
        params: [{ name: 'Identifiant', type: 'text', value: '', server: '' }],
      },
      {
        name: "Quelqu'un ne suit plus le compte ",
        actiondId: 'instagram_action_lose_followers',
        params: [{ name: 'Identifiant', type: 'text', value: '', server: '' }],
      },
      {
        name: "Le compte suit quelqu'un ",
        actiondId: 'instagram_action_win_followings',
        params: [{ name: 'Identifiant', type: 'text', value: '', server: '' }],
      },
      {
        name: "Le compte ne suit plus quelqu'un ",
        actiondId: 'instagram_action_lose_followings',
        params: [{ name: 'Identifiant', type: 'text', value: '', server: '' }],
      },
    ],
    reactions: [],
  },
];

export default services;
