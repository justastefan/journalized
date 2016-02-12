import Ember from 'ember';

export default Ember.Service.extend({

  cookieMonster: Ember.inject.service(),

  store: Ember.inject.service(),

  accessToken: null,
  attemptedTransition: null,
  rememberMe: false,
  user: null,


  authenticate(login, password) {
    return Ember.$.ajax({
      //dataType: 'json',
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "/api/tokens",
      data: JSON.stringify({ username: login, password: password })
      //data: '{"page":{"slug":null,"name":"test","birth":null,"death":null,"location":null,"user":null}}'
    }).then((result) => {
      this.set('accessToken', result.access_token);
      this.set('user', this.get('store').find('user', result.user_id));
    });
  },

  invalidate() {
    this.set('accessToken', null);
    this.set('user', null);
  },

  isAuthenticated: Ember.computed.bool('accessToken'),

  init: function() {
    this._super();
    var accessToken = this.get('cookieMonster').eat('auth_token');
    this.set('accessToken', accessToken);
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
        "X-JOURNALIZED-TOKEN": `Bearer ${this.get('accessToken')}`
      };
    }
    return {};
  })
});
