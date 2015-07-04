CalEvent = new Mongo.Collection('calevent');

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
    // "click .updateTitle": function(evt, tmpl){
    //   var title = tmpl.find('#title').value;
    //   Meteor.call('updateTitle', Session.get('editing_event'),title)
    //   Session.set('editing_event',null)
    // },
    "click .deleteEvent": function(evt, tmpl){
      Meteor.call('deleteEvent', Session.get('editing_event'))
      Session.set('editing_event',null)
    }
  })
  Template.main.helpers({
    editing_event: function(){
      return Session.get('editing_event')
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
  Template.main.rendered = function(){
    var calendar = $('#calendar').fullCalendar({
      dayClick:function(date, allDay, jsEvent, view){
        // console.log('view:',view)
        var calendarEvent = {};
        calendarEvent.start = date;
        calendarEvent.end = date;
        calendarEvent.title = 'New Event';
        calendarEvent.tagline = '';
        calendarEvent.owner = Meteor.userId();
        Meteor.call('saveCalEvent',calendarEvent);
        console.log(calendarEvent)

      },
      eventClick: function(calEvent, jsEvent, view){
        Session.set('editing_event', calEvent._id)
      },
      eventDrop:function(reqEvent){
        Meteor.call('moveEvent', reqEvent)
      },
      events: function(start, end, callback){
        var calEvents = CalEvent.find({}, {reactive:false}).fetch()
        callback(calEvents)
      },
      // eventBackgroundColor: #00FFFF,
      editable: true,
      selectable: true
    }).data().fullCalendar
    Deps.autorun(function(){
      console.log('3')
      CalEvent.find().fetch();
      if(calendar){
        calendar.refetchEvents();
      }
    })
  }
}


if(Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      'saveCalEvent': function(ce){
        CalEvent.insert(ce)
        CalEvent.find

      },
      'updateTitle': function(id, title){
        return CalEvent.update({_id:id},{$set:{title:title}})
      },
      'updateTag': function(id, tagline){
        return CalEvent.update({_id:id},{$set:{tagline: tagline}})
      },
      'moveEvent': function(reqEvent){
        return CalEvent.update({_id:reqEvent._id},{
          $set:{
            start:reqEvent.start,
            end:reqEvent.end
          }
        })
      },
      'deleteEvent': function(id){
        var evnt = CalEvent.findOne({_id:id})
        return CalEvent.remove(evnt)
      }
    })
  })
}

