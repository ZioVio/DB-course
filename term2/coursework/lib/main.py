from db import sessions_repo
import stats
import graphics




def main():
    sessions = sessions_repo.find_all()
    # GRAPHIC 1
    screens_by_all_time = stats.get_most_viewed_screens_by_all_time(sessions)
    # graphics.plot_screens_by_time(screens_by_all_time)


    screen_by_count = stats.get_most_viewed_screens_by_count(sessions)
    # graphics.plot_screens_by_count(screen_by_count)
    #
    # graphics.plot_screens_by_count_and_time(screen_by_count, screens_by_all_time)

    # most_frequent_entry_screen = stats.get_most_frequent_entry_screen(sessions)
    # graphics.plot_entry_screen_frequency(most_frequent_entry_screen)


    actions_frequency_data = stats.get_most_frequent_actions_within_screens(sessions)
    graphics.plot_actions_frequency(actions_frequency_data)


if __name__ == '__main__':
    main()
