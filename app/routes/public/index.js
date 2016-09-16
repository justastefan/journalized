import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    //return this.get('store').query('journal', {'status': 'public'});
    var promise =  this.get('store').query('entry', { filter: {status: 'public'}});
    // promise.then((entries) => {
    //   entries.forEach((entry) => {
    //     entry.get('journalEntries').then((journalEntry) => {
    //       console.log(journalEntry.get('journal'));
    //       journalEntry.get('journal').then((journal)=>{
    //         console.log('get journ'+journal.get('name'));
    //
    //       });
    //     });
    //   });
    // });
    return promise;
    // query the latest entry per journals
    //return this.get('store').query('journal', {'public', true});
  }
});
