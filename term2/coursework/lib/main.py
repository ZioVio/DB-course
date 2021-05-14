from db import sessions_repo
import stats

def main():
    sessions = sessions_repo.find_all()
    # GRAPHIC 1
    screens_by_all_time = stats.get_most_viewed_screens_by_all_time(sessions)
    screen_by_count = stats.get_most_viewed_screens_by_count(sessions)
    #
    most_frequent_entry_screen = stats.get_most_frequent_entry_screen(sessions)
    actions_frequency_data = stats.get_most_frequent_actions_within_screens(sessions)
    print(actions_frequency_data)


if __name__ == '__main__':
    main()
