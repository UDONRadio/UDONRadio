from django.contrib import admin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .models import User, Emission, EmissionInstance

def title(obj):
	return obj.emission.title

class EndedListFilter(admin.SimpleListFilter):
    title = _('ended')

    parameter_name = 'ended'

    def lookups(self, request, model_admin):
        return (
            ('true', _('Yes')),
            ('false', _('No')),
        )

    def queryset(self, request, queryset):
        if self.value() == 'false':
            return queryset.filter(ends__gt=timezone.now())
        if self.value() == 'true':
            return queryset.filter(ends__lte=timezone.now())

@admin.register(EmissionInstance)
class EmissionInstanceAdmin(admin.ModelAdmin):
	list_display = (title, 'has_played', 'starts', 'recorded', 'airtime_id')
	list_filter = (
		('recorded'),
		(EndedListFilter),
	)

@admin.register(Emission)
class EmissionAdmin(admin.ModelAdmin):
	list_display = ('title', 'airtime_id', 'host')

admin.site.register(User)
