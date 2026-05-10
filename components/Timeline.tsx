type Event = {
  date: string;
  titre: string;
  description: string;
};

type TimelineData = {
  [year: string]: Event[];
};

import React from "react";
import styles from "../styles/Timeline.module.scss";

type TimelineProps = {
  data: TimelineData; // TimelineData correspond au type que nous avons défini précédemment
  BackgroundFill?: string;
};

const Timeline: React.FC<TimelineProps> = ({ data, BackgroundFill }) => {
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));

  return (
    <div className={styles.timeline} style={{ backgroundColor: `${BackgroundFill}`}}>
      <div>
        {years.map((year) => (
          <div key={year} className={styles.timeline_year}>
            {/* Point pour l'année */}
            <div className={styles.timeline_point}>
              <div className={styles.year_label}>{year}</div>
            </div>

            {/* Événements pour cette année */}
            <div className={styles.timeline_events}>
              {data[year].map((event, index) => (
                <div key={index} className={styles.timeline_event}>
                  <div className={styles.event_line}></div>
                  <div className={styles.event_lineHz}></div>
                  <div className={styles.event_content}>
                    <div className={styles.event_title}>
                      <strong>{event.titre}</strong>
                    </div>
                    <div className={styles.event_description}>
                      {event.date} - {event.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

