import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  errorMessage: '',
  login: 'j@ons.on',
  password: 'test',
  loginSuccessful: null,
  rememberMe: false,
  actions: {
    authenticate() {
      this.set('errorMessage', '');

      this.get('authManager').set('rememberMe', this.get('rememberMe'));
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password).then(() => {
        this.attrs.onSuccess();
      }, (err) => {
        this.set('errorMessage', err.responseText);
      });
    }
  }
});
