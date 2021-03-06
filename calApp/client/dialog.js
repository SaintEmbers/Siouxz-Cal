if(Meteor.isClient){

  Template.dialog.events({
    "click .closeDialog": function(event, template){
      Session.set('editing_event',null)
    },
    "click .update": function(evt, tmpl){
      var tagLine = tmpl.find('#tagline').value
      var title = tmpl.find('#title').value
      // var media = tmpl.find('#pic').value
      // console.log(media)
      Meteor.call('updateTitle', Session.get('editing_event'),title)
      Meteor.call('updateTag', Session.get('editing_event'), tagLine)
      // Meteor.call('addMedia', Session.get('editing_event'), media)
      Session.set('editing_event',null)
    },
    "click .deleteEvent": function(evt, tmpl){
      Meteor.call('deleteEvent', Session.get('editing_event'))
      Session.set('editing_event',null)
    },
    "click .uploadEvent": function(evt, tmpl){
      Session.get('adding_Media',true)
    },
    "change input[type='file']": function(e) {
    $.cloudinary.config({
        cloud_name:"siouxzcal"
    });
    var files;
    files = e.currentTarget.files;
    console.log(files)
    // Cloudinary.url()
    Cloudinary.upload(files, null, function(err,result) {
        console.log(err)
        console.log('result',result)
        var mediaUrl = result.secure_url
        console.log(mediaUrl)
        Meteor.call('addMedia', Session.get('editing_event'), mediaUrl)
    });
    console.log(Cloudinary)
  },
  "click .insta": function(evt){
         Meteor.loginWithInstagram(function (err, res) {
          if (err !== undefined)
            console.log('sucess ' + res)
          else
            console.log('login failed ' + err)
      });
  }
  })

  Template.dialog.helpers({
    title: function(){
      var ce = CalEvent.findOne({_id:Session.get('editing_event')})
      return ce.title
    },
    tagline: function(){
        var ce = CalEvent.findOne({_id:Session.get('editing_event')})
        return ce.tagline
    },
    mediaUrl: function(){
      var ce = CalEvent.findOne({_id:Session.get('editing_event')})
      return ce.mediaUrl
    }
  })

  Template.dialog.rendered = function(){
    if(Session.get('editDialog')){
      var calEvent = CalEvent.findOne({_id: Session.get('editDialog')})
      console.log('calEvnt', calEvent)
      if(calevent){
        console.log('calstuff',calEvent)
        $('#title').val(calEvent.title)
        $('#tagline').val(calEvent.tagline)
      }
    }
  }

}
