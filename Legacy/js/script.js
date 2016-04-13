var app = angular.module('app', []);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
});

app.controller('ctrl', function ($scope) {
    var db;

    if (localStorage.getItem("mydata") != null)
        db = new SQL.Database(toBinArray(localStorage.getItem("mydata")));
    else
    {
        db = new SQL.Database();
        db.run("CREATE TABLE IF NOT EXISTS Requests (Name varchar(63), Email varchar(63), Requested datetime, Status varchar(31));");
    }

    $scope.addRequest = function (name, email) {
        db.run("INSERT INTO Requests VALUES (?,?,?,?)", [name, email, new Date().toLocaleString(), "Pending"]);
        window.localStorage.setItem("mydata", toBinString(db.export()));
    };

    $scope.getAllRequests = function () {
        $scope.requests = db.exec("SELECT * FROM Requests;")[0].values;
    };

    function toBinString(arr) {
        var uarr = new Uint8Array(arr);
        var strings = [], chunksize = 0xffff;
        for (var i = 0; i * chunksize < uarr.length; i++) {
            strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
        }
        return strings.join('');
    }

    function toBinArray(str) {
        var l = str.length,
                arr = new Uint8Array(l);
        for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
        return arr;
    }

    $scope.games = [
      { 'name': 'Starcraft 2', 'url': 'http://us.battle.net/sc2/en/' },
      { 'name': 'Minecraft', 'url': 'https://minecraft.net/' },
      { 'name': 'Smite', 'url': 'http://www.smitegame.com/' },
      { 'name': 'Hearthstone', 'url': 'http://us.battle.net/hearthstone/en/' }
    ];
    
    $scope.GamesWePlayShow = false;
    $scope.toggleGames = function () {
        $scope.GamesWePlayShow = !$scope.GamesWePlayShow;
    };

    $scope.JoinUsShow = false;
    $scope.toggleJoin = function () {
        $scope.JoinUsShow = !$scope.JoinUsShow;
    };

    $scope.RequestsShow = false;
    $scope.toggleRequests = function () {
        $scope.RequestsShow = !$scope.RequestsShow;
    };

    $scope.streamers = [
      { 'name': 'Steel TV', 'url': 'https://www.twitch.tv/steel_tv' },
      { 'name': 'Tarik TV', 'url': 'https://www.twitch.tv/tarik_tv' },
      { 'name': 'TimTheTatman', 'url': 'https://www.twitch.tv/timthetatman' },
      { 'name': 'Olofmeister', 'url': 'https://www.twitch.tv/olofmeister' },
      { 'name': 'kennyS', 'url': 'https://www.twitch.tv/kennys' }
    ];

    $scope.StreamersShow = false;
    $scope.toggleStreamers = function () {
        $scope.StreamersShow = !$scope.StreamersShow;
    };

    $scope.AutoExecShow = false;
    $scope.toggleAutoExec = function () {
        $scope.AutoExecShow = !$scope.AutoExecShow;
    };

    $scope.videos = [
      { 'name': 'CS GO : Rip King', 'url': 'https://www.youtube.com/embed/g_FB4Bw99KU', 'tag': 'fun' },
      { 'name': 'Masters of CS:GO', 'url': 'https://www.youtube.com/embed/KqRs_2kGZuY', 'tag': 'fun' },
      { 'name': 'CS GO : Source', 'url': 'https://www.youtube.com/embed/_8Nb_zgWZZ4', 'tag': 'fun' },
      { 'name': 'How to Play CSGO After the Update', 'url': 'https://www.youtube.com/embed/lvuEuB6sRrs', 'tag': 'fun' },
      { 'name': 'GETTING STARTED! - Counter Strike: Global Offensive', 'url': 'https://www.youtube.com/embed/OBHvRe6-VkM', 'tag': 'tutorial' },
      { 'name': 'Does peeker\'s advantage really exist? [Analysis]', 'url': 'https://www.youtube.com/embed/3JaCcsmjYM8', 'tag': 'tutorial' },
      { 'name': 'HOW TO SURF IN CS:GO', 'url': 'https://www.youtube.com/embed/jls3lMmHbvA', 'tag': 'tutorial' },
      { 'name': 'How to Practice CS:GO - Counter-Strike: Global Offensive Tutorial', 'url': 'https://www.youtube.com/embed/og73XpXhxtk', 'tag': 'tutorial' },
      { 'name': 'AK47 Tutorial CS:GO', 'url': 'https://www.youtube.com/embed/QEqVInxyL5w', 'tag': 'tutorial' },
      { 'name': 'CS:GO - Fnatic vs. Luminosity [Cache] Map 2 - IEM Katowice 2016 - Grand Final', 'url': 'https://www.youtube.com/embed/KySzKy9NTUk', 'tag': 'match' },
      { 'name': 'CS:GO - Fnatic vs. Luminosity [Overpass] Map 1 - IEM Katowice 2016 - Grand Final', 'url': 'https://www.youtube.com/embed/4FHJ_8lBBF0', 'tag': 'match' },
      { 'name': 'CS:GO - Cloud9 vs. fnatic [Dust2] - ESL ESEA Pro League Finals - Grand Finals Map 4', 'url': 'https://www.youtube.com/embed/A4ORZdLk6_A', 'tag': 'match' },
      { 'name': 'CS:GO Pro Match - Fnatic vs Luminosity - Inferno from Starladder', 'url': 'https://www.youtube.com/embed/63BIlzN_CtM', 'tag': 'match' },
    ]
});
