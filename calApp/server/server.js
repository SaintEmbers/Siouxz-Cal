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
      'addMedia': function(id, media){
        return CalEvent.update({_id:id}, {$set:{media: media}})
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
