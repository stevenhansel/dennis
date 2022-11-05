import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { CurrentEpisode, EpisodeVote, Song } from '../../../types/model';

const defaultOptions: Highcharts.Options = {
  title: { text: '' },
  chart: {
    type: 'pie',
    backgroundColor: '#1f2937',
    borderWidth: 0,
    plotBackgroundColor: '#1f2937',
    plotBorderWidth: 0,
    plotShadow: false,
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
        valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: []
};

type Props = {
  episode: CurrentEpisode;
  episodeVotes: EpisodeVote[];
};

const VotePieChart = (props: Props) => {
  const { episode, episodeVotes } = props;
  const chartOptions: Highcharts.Options = useMemo(() => {
    if (episode && episodeVotes) {
      const songMap: Record<string, Song> = episode.songs.reduce((acc, cur) => ({
        ...acc,
        [cur.episodeSongId]: cur,
      }), {})
      const serieData = episodeVotes.map((vote) => ({
        name: songMap[vote.episodeSongId]?.songNameJp,
        y: +(episode.numOfVotesCasted / vote.numOfVotes).toFixed(2)
      }))

      const newOptions = {
        ...defaultOptions,
        series: [{
          type: 'pie',
          name: 'Vote',
          borderWidth: 0,
          colorByPoint: true,
          data: serieData
        } as Highcharts.SeriesPieOptions]
      }

      return newOptions
    }
    return defaultOptions
  }, [episode, episodeVotes])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
};

export default VotePieChart;