# чаще всего и дольше всего - график и анализ топ - TODO GRAPHIC
# самый частый первый екран TODO GRAPHIC OR CONSOLE
# самый частый екшен и его екран - TODO together with next
# название скрина и процент екшенов, что на нем происходят. таким образом понять TODO LIKE PREV
# нужен ли этот екшен на этом скрине вообще

# СДЕЛАТЬ ВСЕ НА МАСИВАХ ПРОСТЫХ И ЕСЛИ УСПЕЮ ТО ПЕРЕДЕЛАТЬ НА numpy и pandas

from data.generator import DataGenerator

datagen = DataGenerator()


def get_most_viewed_screens_by_all_time(sessions):
    screens_time_map = {}
    for session in sessions:
        session_screens = session.get('screens', [])
        for screen in session_screens:
            screen_id = screen['id']
            screen_time = screen['time']
            total_screen_time = screens_time_map.get(screen['id'], 0)
            screens_time_map[screen_id] = total_screen_time + screen_time

    sorted_screen_ids = sorted(screens_time_map.keys(), key=lambda key: screens_time_map[key], reverse=True)

    sorted_screens = [{'screen': datagen.get_screen_by_id(screen_id), 'time': screens_time_map[screen_id]} for screen_id
                      in sorted_screen_ids]

    return sorted_screens


def get_most_viewed_screens_by_count(sessions):
    screens_time_map = {}
    for session in sessions:
        session_screens = session.get('screens', [])
        for screen in session_screens:
            screen_id = screen['id']
            total_screen_counts = screens_time_map.get(screen['id'], 0)
            screens_time_map[screen_id] = total_screen_counts + 1

    sorted_screen_ids = sorted(screens_time_map.keys(), key=lambda key: screens_time_map[key], reverse=True)

    sorted_screens = [{'screen': datagen.get_screen_by_id(screen_id), 'counts': screens_time_map[screen_id]} for
                      screen_id in sorted_screen_ids]

    return sorted_screens


def get_most_frequent_entry_screen(sessions):
    entry_screens_count_map = {}
    for session in sessions:
        session_screens = session.get('screens', [])
        if len(session_screens) == 0:
            continue

        first_screen = session_screens[0]
        screen_count = entry_screens_count_map.get(first_screen['id'], 0)
        entry_screens_count_map[first_screen['id']] = screen_count + 1

    sorted_screen_ids = sorted(entry_screens_count_map.keys(), key=lambda key: entry_screens_count_map[key],
                               reverse=True)

    sorted_screens = [{'screen': datagen.get_screen_by_id(screen_id), 'time': entry_screens_count_map[screen_id]} for
                      screen_id
                      in sorted_screen_ids]

    return sorted_screens


def get_most_frequent_actions_within_screens(sessions):
    counts_map = {}
    for session in sessions:
        for screen in session['screens']:
            screen_count = counts_map.get(screen['id'], {'count': 0})['count']
            if counts_map.get(screen['id'], None) is None:
                counts_map[screen['id']] = {}
            counts_map[screen['id']]['count'] = screen_count + 1
            actions_count_map = counts_map[screen['id']].get('actions_counts_map', {})
            print(counts_map[screen['id']])
            counts_map[screen['id']]['actions_counts_map'] = actions_count_map
            for action in screen['actions']:
                action_count = actions_count_map.get(action['name'], 0)
                actions_count_map[action['name']] = action_count + 1

            sorted_actions = sorted(actions_count_map.keys(), key=lambda key: actions_count_map[key],
                                    reverse=True)
            counts_map[screen['id']]['actions'] = [{'name': action_name} for action_name in sorted_actions]

    return [
        {'id': screen_id, 'data': data} for screen_id, data in counts_map.items()
    ]
