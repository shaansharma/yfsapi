var leagueHelper = require('../helpers/leagueHelper.js');

module.exports = LeagueResource;

function LeagueResource(yf) {
  this.yf = yf;
}

LeagueResource.prototype.meta = function(leagueKey, cb) {
  var apiCallback = this._meta_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/metadata?format=json',
      apiCallback
    );
};

LeagueResource.prototype._meta_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var meta = data.fantasy_content.league[0];
  return cb(null, meta);
};

LeagueResource.prototype.settings = function(leagueKey, cb) {
  var apiCallback = this._settings_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/settings?format=json',
      apiCallback
    );
};

LeagueResource.prototype._settings_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var settings = leagueHelper.mapSettings(data.fantasy_content.league[1].settings[0]);
  var league = data.fantasy_content.league[0];
  settings.league = league;

  return cb(null, settings);
};

LeagueResource.prototype.standings = function(leagueKey, cb) {
  var apiCallback = this._standings_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/standings?format=json',
      apiCallback
    );
};

LeagueResource.prototype._standings_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var standings = leagueHelper.mapStandings(data.fantasy_content.league[1].standings[0].teams);
  var league = data.fantasy_content.league[0];

  // todo: do i want the stats for each category as well?
  league.standings = standings;

  return cb(null, league);
};

// h2h only
// todo: add weeks param
LeagueResource.prototype.scoreboard = function(leagueKey, cb) {
  var apiCallback = this._scoreboard_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/scoreboard?format=json',
      apiCallback
    );
};

LeagueResource.prototype._scoreboard_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var week = data.fantasy_content.league[1].scoreboard.week;
  var scoreboard = leagueHelper.mapScoreboard(data.fantasy_content.league[1].scoreboard[0].matchups);
  var league = data.fantasy_content.league[0];

  league.scoreboard = scoreboard;
  league.scoreboard.week = week;

  return cb(null, league);
};

LeagueResource.prototype.teams = function(leagueKey, cb) {
  var apiCallback = this._teams_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/teams?format=json',
      apiCallback
    );
};

LeagueResource.prototype._teams_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var teams = leagueHelper.mapTeams(data.fantasy_content.league[1].teams);
  var league = data.fantasy_content.league[0];
  league.teams = teams;

  return cb(null, league);
};

// not quite sure how to wrap this yet...
LeagueResource.prototype.players = function(leagueKey, cb) {
  var apiCallback = this._players_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/players?format=json',
      apiCallback
    );
};

LeagueResource.prototype._players_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var players = data.fantasy_content.league[1].players;
  return cb(null, players);
};

LeagueResource.prototype.draft_results = function(leagueKey, cb) {
  var apiCallback = this._draft_results_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/draftresults?format=json',
      apiCallback
    );
};

LeagueResource.prototype._draft_results_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var draft = leagueHelper.mapDraft(data.fantasy_content.league[1].draft_results);
  var league = data.fantasy_content.league[0];

  league.draft_results = draft;

  return cb(null, league);
};

LeagueResource.prototype.transactions = function(leagueKey, cb) {
  var apiCallback = this._transactions_callback.bind(this, cb);
  
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/transactions?format=json',
      apiCallback
    );
};

LeagueResource.prototype._transactions_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var transactions = leagueHelper.mapTransactions(data.fantasy_content.league[1].transactions);
  var league = data.fantasy_content.league[0];

  league.transactions = transactions;

  return cb(null, league);
};