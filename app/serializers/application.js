import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, kind) {
    // key = key.decamelize();
    if (kind === "belongsTo") {
	  // creates: "ownArticlePackage_id"
      return 'own'+key.capitalize() + "_id";
    } else if (kind === "hasMany") {
	  // creates: "articlePackage_ids"
	  return key.singularize()+'_ids';
    } else {
	  // creates "article_package"
      return key.decamelize();
    }
  }
});
