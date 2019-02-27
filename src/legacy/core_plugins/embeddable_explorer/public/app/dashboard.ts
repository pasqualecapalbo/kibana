/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export const dashboardInput = {
  embeddables: {},
  metadata: {
    title: 'New Dashboard',
    description: '',
  },
  panels: {
    '1': {
      gridData: {
        h: 15,
        i: '1',
        w: 24,
        x: 0,
        y: 0,
      },
      id: '37cc8650-b882-11e8-a6d9-e546fe2bba5f',
      panelIndex: '1',
      type: 'visualization',
      version: '8.0.0',
    },
    '2': {
      gridData: {
        h: 15,
        i: '2',
        w: 24,
        x: 24,
        y: 0,
      },
      id: 'ed8436b0-b88b-11e8-a6d9-e546fe2bba5f',
      panelIndex: '2',
      type: 'visualization',
      version: '8.0.0',
    },
  },
  view: {
    filters: [],
    hidePanelTitles: false,
    isFullScreenMode: false,
    query: {
      language: 'kuery',
      query: '',
    },
    timeRange: {
      from: 'now-15m',
      to: 'now',
    },
    useMargins: true,
    viewMode: 'view',
  },
};
