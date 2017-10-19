from radio.models import Schedule

class SchedulerMixin():

    def __init__(self):
        super().__init__() # Call mixed class constructor
        self.scheduled = Schedule.objects.all()
