'use strict';

// Require our models. Running each module registers the model into sequelize
const User = require('./User')
const UserProfilePicture = require('./UserProfilePicture')
const PossibleMatches = require('./Swipes')
const Conversations = require('./Conversation')
const Messages = require('./ConvoMessage')

// Form the associations
UserProfilePicture.belongsTo(User)
PossibleMatches.belongsTo(User)
Conversations.hasMany(Messages)
Messages.belongsTo(Conversations)

// Song.belongsTo(Album);
// Album.hasMany(Song);
// Album.belongsTo(Artist); // "Album Artist" is a thing, even if there are
//                          // other artists on the album.
// Artist.belongsToMany(Song, { through: 'artistSong' });
// Song.belongsToMany(Artist, { through: 'artistSong' });
//
// Song.belongsToMany(Playlist, { through: 'playlistSong' });
// Playlist.belongsToMany(Song, { through: 'playlistSong' });

// exported just in case, but can also be fetched via db.model('Album') etc.
module.exports = {
  User,
  UserProfilePicture,
  PossibleMatches,
  Conversations,
  Messages
}
