# wp-stats

Track WordPress plugins and themes statistics from the command line.

![](https://i.imgur.com/WUuSsZx.png)

## Install

```
$ npm install -g wp-stats
```

## Commands

You can check `plugins` and `themes` statistics by using the next commands:

### wp-stats plugin

Get plugins statistics.

```
wp-stats plugin [options]
wp-stats plugins [options]
```

The `wp-stats plugin` command can be called in plural `wp-stats plugins`.

### wp-stats theme

Get themes statistics.

```
wp-stats theme [options]
wp-stats themes [options]
```

The `wp-stats theme` command can be called in plural `wp-stats themes`.

## Options

```
--author, -a   Get plugins or themes by author.
--slug, -s     Get a plugin or theme by slug.
--fields, -f   Show extra fields in the table separated by commas.
--no-fields    Hide fields in the table separated by commas.
--per_page     Show total items per page. Default: 10.
```

## Usage

Get plugins or themes by author:

```
wp-stats plugin --author=rokumetal
wp-stats theme --author=rokumetal
```

Get plugin or theme by slug:

```
wp-stats plugin --slug=wp-countup-js
wp-stats theme --slug=wp-countup-js
```

Get plugins or themes with extra fields (separated by commas):

```
wp-stats plugins --fields=rating,support_threads
wp-stats themes --fields=rating
```

Get plugins or themes without some fields (separated by commas):

```
wp-stats plugins --no-fields=downloaded,slug
wp-stats themes --no-fields=downloaded,slug
```

## Available Fields

The `--fields` and `--no-fields` options can accept a string with fields separated by commas. The allowed fields are:

- active_installs
- author
- downloaded
- last_updated
- name
- num_ratings
- rating
- slug
- support_threads
- support_threads_resolved
- version

The default fields that will always show are:

- name
- slug
- version
- downloaded
- active_installs
