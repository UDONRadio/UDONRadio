import requests
import datetime
from pytz import timezone as tz
from django.utils import timezone
from django.core.management.base import BaseCommand, CommandError
from tarlyfm_back.api.models import Emission, EmissionInstance, User

AIRTIME_TIMEZONE = tz('Europe/Paris')

class Command(BaseCommand):
	help = 'Imports the week schedule info from Airtime'

	def add_arguments(self, parser):
		parser.add_argument('airtime_url', nargs=1)

	def handle(self, *args, **kwargs):
		airtime_url = kwargs['airtime_url'][0]
		r = requests.get(airtime_url + '/api/week-info')
		r.encoding = 'utf-8'
		ret = r.json()
		for day in ret:
			if day == 'AIRTIME_API_VERSION':
				break
			for entry in ret[day]:

				starts = datetime.datetime.strptime(entry['starts'], "%Y-%m-%d %H:%M:%S")
				starts = timezone.make_aware(starts, AIRTIME_TIMEZONE)
				ends = datetime.datetime.strptime(entry['ends'], "%Y-%m-%d %H:%M:%S")
				ends = timezone.make_aware(ends, AIRTIME_TIMEZONE)
				try:
					emission = Emission.objects.create(
						title = entry['name'],
						pitch = 'autoimported from airtime',
						airtime_id = entry['id'],
						host = User.objects.filter(is_staff=True)[0],
					)
				except:
					emission = Emission.objects.get(airtime_id=entry['id'])
				try:
					EmissionInstance.objects.create(
						starts = starts,
						ends = ends,
						airtime_id = entry['instance_id'],
						recorded = entry['record'] != 0,
						emission = emission
					)
				except:
					emissioninst = EmissionInstance.objects.get(airtime_id=entry['instance_id'])
					emissioninst.starts = starts
					emissioninst.ends = ends
					emissioninst.recorded = entry['record'] != 0
					emissioninst.emission = emission
					emissioninst.save()
