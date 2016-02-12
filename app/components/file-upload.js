import Ember from 'ember';
import EmberUploader from '../utils/uploader';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  url: '/api/images',
  file: null,
  progress: null,
  failed: false,
  success: false,
  filesDidChange: Ember.observer('file', function() {
    this.set('failed', false);
    this.set('process', 0);
    this.set('success', false);


    if (Ember.isEmpty(this.get('file'))) {
      return false;
    }


    var uploadUrl = this.get('url');
    // EmberUploader.extend({
    //   url: uploadUrl,
    //   ajaxSettings() {
    //     var settings = this._super(...arguments);
    //     settings.headers = this.get('headers');
    //     return settings;
    //   },
    //
    //   authManager: Ember.inject.service(),
    //   headers: Ember.computed('authManager.accessToken', function() {
    //   	if (!Ember.isEmpty(this.get('authManager.accessToken'))) {
    // 	    return {
    // 	      "X-JOURNALIZED-TOKEN": `Bearer ${this.get('authManager.accessToken')}`
    // 	    };
    //   	}
    // 	  return {};
    //   }),
    // });

    var uploader = EmberUploader.create({
      url: uploadUrl,
      headers: this.get('authManager.ajaxHeaders')
    });

    uploader.on('progress', function(e) {
      this.set('progress', e.percent);
    }.bind(this));

    var promise = uploader.upload(this.get('file'));
    promise.then(function() {
      this.set('progress', 100);
      this.set('success', true);
    }.bind(this), function() {
      this.set('progress', 0);
      this.set('failed', true);
    }.bind(this));

  }).on('init')

});
