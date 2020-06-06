# Generated by Django 2.1.1 on 2019-06-09 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('radio', '0007_song_enabled'),
    ]

    operations = [
        migrations.CreateModel(
            name='Archive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='autoplaylist',
            name='authors',
        ),
        migrations.RemoveField(
            model_name='autoplaylist',
            name='songs',
        ),
        migrations.RemoveField(
            model_name='autoplaylistindex',
            name='auto_playlist',
        ),
        migrations.RemoveField(
            model_name='autoplaylistindex',
            name='song',
        ),
        migrations.RemoveField(
            model_name='jingle',
            name='authors',
        ),
        migrations.RemoveField(
            model_name='recordedshow',
            name='authors',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='show_type',
        ),
        migrations.DeleteModel(
            name='AutoPlaylist',
        ),
        migrations.DeleteModel(
            name='AutoPlaylistIndex',
        ),
        migrations.DeleteModel(
            name='Jingle',
        ),
        migrations.DeleteModel(
            name='RecordedShow',
        ),
        migrations.DeleteModel(
            name='Schedule',
        ),
        migrations.AddField(
            model_name='song',
            name='archive',
            field=models.ManyToManyField(null=True, to='radio.Archive'),
        ),
    ]