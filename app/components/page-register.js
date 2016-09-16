import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  errorMessage: '',
  name: 'mike',
  email: 'mik@test.de',
  password: '123',
  isValidName: Ember.computed('name', function() {
    if (Ember.isEmpty(this.get('name'))) {
      return false;
    }
    return true;
  }),
  isValidPassword: Ember.computed('email', function() {
    if (Ember.isEmpty(this.get('email'))) {
      return false;
    }
    return true;
  }),
  isValidEMail: Ember.computed('email', function() {
    if (Ember.isEmpty(this.get('email'))) {
      return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.get('email'))) {
      return false; // wrong email address
    }
    return true;
  }),
  isValid: Ember.computed.and('isValidPassword','isValidName', 'isValidEMail'),
  isInvalid: Ember.computed.not('isValid'),
  actions: {
    register() {
      this.set('errorMessage', '');
      var user = this.get('store').createRecord('user', this.getProperties('name','email','password'));
      user.save().then((savedUser) => {
        this.attrs.onSuccess(savedUser);
      }, (err) => {
        this.set('errorMessage', err.responseText);
      });
    }
  }
});
