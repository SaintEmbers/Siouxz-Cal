
if(Meteor.isClient){

  Template.dialog.events({
    "click .closeDialog": function(event, template){
      Session.set('editing_event',null)
    },
    "click .update": function(evt, tmpl){
      var tagLine = tmpl.find('#tagline').value
      var title = tmpl.find('#title').value;
      Meteor.call('updateTitle', Session.get('editing_event'),title)
      Meteor.call('updateTag', Session.get('editing_event'), tagLine)
      Session.set('editing_event',null)
    },
    "click .deleteEvent": function(evt, tmpl){
      Meteor.call('deleteEvent', Session.get('editing_event'))
      Session.set('editing_event',null)
    },
    "click .uploadEvent": function(evt, tmpl){

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
