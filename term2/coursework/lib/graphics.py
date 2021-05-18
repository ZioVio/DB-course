import matplotlib.pyplot as plt
from matplotlib.ticker import FormatStrFormatter

plt.rcdefaults()
import numpy as np


def plot_screens_by_time(screens):
    names = [screen_data['screen']['name'] for screen_data in screens]
    times = [screen_data['time'] / 60 / 60 for screen_data in screens]  # hours

    y_pos = np.arange(len(names))

    plt.bar(y_pos, times, align='center')
    plt.xticks(y_pos, names, rotation='vertical')
    plt.gca().yaxis.set_major_formatter(FormatStrFormatter('%.2f'))
    plt.ylabel('Time, h')
    plt.title('Total screen time')

    plt.subplots_adjust(bottom=0.5, left=0.2)
    plt.show()


def plot_screens_by_count(screens):
    names = [screen_data['screen']['name'] for screen_data in screens]
    counts = [screen_data['counts'] for screen_data in screens]

    y_pos = np.arange(len(names))

    plt.bar(y_pos, counts, align='center')
    plt.xticks(y_pos, names, rotation='vertical')
    plt.gca().yaxis.set_major_formatter(FormatStrFormatter('%.2f'))
    plt.ylabel('Count')
    plt.title('Total screen appearing count')

    plt.subplots_adjust(bottom=0.5, left=0.2)
    plt.show()


def plot_screens_by_count_and_time(screens_by_count, screens_by_time):
    counts = [screen_data['counts'] for screen_data in screens_by_count]
    times = [screen_data['time'] / 60 / 60 for screen_data in screens_by_time]  # hours

    plt.plot(times, counts, 'o', markersize=5)

    plt.ylabel('Screen opening counts')
    plt.xlabel('Screen opening time, h')

    plt.show()


def plot_entry_screen_frequency(screens):
    names = [screen_data['screen']['name'] for screen_data in screens]
    times = [screen_data['time'] / 60 / 60 for screen_data in screens]  # hours
    print(names)

    fig1, ax1 = plt.subplots()
    ax1.pie(times, labels=names, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    plt.show()


def plot_actions_frequency(actions_data):
    screens_with_actions = [action for action in actions_data if len(action['data']['actions']) > 0]

    print(screens_with_actions)

    fig, axs = plt.subplots(len(screens_with_actions))
    fig.suptitle('Sharing both axes')

    for idx, screen in enumerate(screens_with_actions):
        actions_names = screen['data']['actions_counts_map'].keys()
        values = [screen['data']['actions_counts_map'][action_name] for action_name in actions_names]
        axs[idx].pie(values, labels=actions_names, autopct='%1.1f%%',
                shadow=True)
        axs[idx].axis('equal')


    plt.show()
