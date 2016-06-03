
export default class GoogleApiLoader {
  constructor() {
    this.app_settings = require('../app_settings.json')
    this.clientsLoaded = 0;
    this.sign2Loaded = false;
    this.auth2Loaded = false;
    this.auth2;

    if (this.app_settings.scopes.indexOf('profile') === -1)
      this.app_settings.scopes.push('profile');
    this.gapiLoaded(this.loadClients.bind(this));
  }

  clientLoaded() {
    this.clientsLoaded++ ;
  }

  clientsLoaded(callback) {
    var ids = 0;
    var libraries = this.app_settings.libraries;
    var check = ()=> {
      if (id++ > 1000 || libraries.length === this.clientsLoaded) {
        callback();
      }
      else {
        window.setTimeout(()=>{ check(); }, 50);
      }
    }
    check();
  }

  authLoaded(callback) {
    var check = ()=> {
      if (this.auth2Loaded && this.sign2Loaded) {
        callback();
      }
      else {
        window.setTimeout(()=>{ check(); }, 50);
      }
    }

    check();
  }

  gapiLoaded(callback) {
    var hasgapi = ()=> {

      if (typeof (gapi) !== "undefined" && gapi.client) {
        callback();
      }
      else {
        window.setTimeout(()=>{ hasgapi(); }, 50);
      }
    }

    hasgapi();
  }

  getAuth2() {
    return this.auth2;
  }

  signIn() {
    var _this = this;
    var options = new gapi.auth2.SigninOptionsBuilder({
      scopes: _this.app_settings.scopes.join(' ')
    });

    this.getAuth2().signIn(options).then(function (success) {
    }, function (fail) {
    });
  }

  loadClients() {
    this.loadAuth2();
    this.loadSignin2();
    this.loadLibraries();
  }

  loadAuth2() {
    var _this = this;
    gapi.load('auth2', function () {
      _this.auth2 = gapi.auth2.init({
        client_id: _this.app_settings.client_id,
        scopes: _this.app_settings.scopes.join(' ')
      });
      _this.auth2Loaded = true;
    });  
  }

  loadSignin2() {
    var _this = this;
    gapi.load('signin2', function () {
      _this.sign2Loaded = true;
    }); 
  }

  loadLibraries() {
    for (var i = 0; i < this.app_settings.libraries.length; i++) {
      var client = this.app_settings.libraries[i];
      gapi.client.load(client.name, client.version, this.clientLoaded.bind(this));
    }
  }
}
