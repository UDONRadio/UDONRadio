from django.core.management.base import BaseCommand, CommandError
from radio.models import Song

class Command(BaseCommand):
    help = 'Prints the next song to be played and save it as played.'

    def handle(self, *args, **options):
        unplayed = Song.objects.filter(play_count=0)
        if unplayed.exists():
            song = unplayed.earliest('upload__created')
        else:
            # Raises an exception if no song exists
            song = Song.objects.order_by('?')[0]
        song.play_count += 1;
        song.save()
        self.stdout.write(song.upload.audio.name)
