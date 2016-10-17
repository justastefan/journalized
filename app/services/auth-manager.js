import Ember from 'ember';

export default Ember.Service.extend({

  cookieMonster: Ember.inject.service(),

  store: Ember.inject.service(),

  accessToken: null,
  token: null,
  attemptedTransition: null,
  rememberMe: false,
  user: Ember.computed.alias('token.user'),
  // user: Ember.computed('token', function() {
  //   return this.get('token') ? this.get('token.user') : null;
  // }),
  // user: null,

  authenticate(login, password) {

    var token = this.get('store').createRecord('token', {
      "name": login,
      "password": password
    });

    var promise = new Ember.RSVP.Promise((resolve, reject) => {
      token.save().then((token) => {
        this.set('accessToken', token.get('id'));
        this.set('token', token);
      //   return this.get('store').find('user', token.get('id'));
        return token.get('user');
      }).then((user)=>{
         this.set('user',user);
         resolve(user);
      }).catch((error)=> {
        reject(error);
      });
    });



    //
    // var promise = token.save().then((token) => {
    //   this.set('accessToken', token.get('id'));
    //   this.set('token', token);
    // //   return this.get('store').find('user', token.get('id'));
    // //   return token.get('user');
    // // }).then((user)=>{
    // //   this.set('user',user);
    // });

    // var promise = Ember.$.ajax({
    //   //dataType: 'json',
    //   contentType: "application/json; charset=utf-8",
    //   method: "POST",
    //   url: "/api/tokens",
    //   data: JSON.stringify({ name: login, password: password })
    //   //data: '{"page":{"slug":null,"name":"test","birth":null,"death":null,"location":null,"user":null}}'
    // }).then((result) => {
    //   this.set('accessToken', result.access_token);
    //   return this.get('store').find('user', result.user_id);
    // }).then((user)=>{
    //   this.set('user',user);
    // });
    return promise;
  },

  invalidate() {
    this.set('accessToken', null);
    this.set('token', null);
    this.set('user', null);
  },

  isAuthenticated: Ember.computed.bool('token'),

  init: function() {
    this._super();
    var accessToken = this.get('cookieMonster').eat('auth_token');
    if (accessToken) {
      this.get('store').find('token', accessToken).then((token) => {
        this.set('token', token);
        this.set('accessToken', accessToken);
      });
    }
  },

  accessTokenObserver: Ember.observer('accessToken', function() {
    if (Ember.isEmpty(this.get('accessToken'))) {
      this.get('cookieMonster').burn('auth_token');
    } else if(this.get('rememberMe')) {
      // set cookie only when "rememberMe" is true
      var days = 10;
      this.get('cookieMonster').bake('auth_token', this.get('accessToken'), days);
    }
  }),
  ajaxHeaders: Ember.computed('accessToken', function() {
    if (!Ember.isEmpty(this.get('accessToken'))) {
      return {
        "X-JOURNALIZED-TOKEN": `${this.get('accessToken')}`
      };
    }
    return {};
  })
});
