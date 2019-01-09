/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

import { StringMap } from '../../../../typings/common';
import { legacyDecodeURIComponent } from '../../../utils/url';
// @ts-ignore
import ErrorGroupDetails from '../ErrorGroupDetails';
import { ServiceDetails } from '../ServiceDetails';
import { TransactionDetails } from '../TransactionDetails';
import { Home } from './Home';

interface BreadcrumbArgs {
  match: {
    params: StringMap;
  };
}

interface RenderArgs {
  location: StringMap;
  match: {
    params: StringMap;
  };
}

const renderAsRedirectTo = (to: string) => {
  return ({ location }: RenderArgs) => (
    <Redirect
      to={{
        ...location,
        pathname: to
      }}
    />
  );
};

export const routes = [
  {
    exact: true,
    path: '/',
    render: renderAsRedirectTo('/services'),
    breadcrumb: 'APM'
  },
  {
    exact: true,
    path: '/:serviceName/errors/:groupId',
    component: ErrorGroupDetails,
    breadcrumb: ({ match }: BreadcrumbArgs) => match.params.groupId
  },
  {
    exact: true,
    path: '/:serviceName/errors',
    component: ServiceDetails,
    breadcrumb: 'Errors'
  },
  {
    switch: true,
    routes: [
      {
        exact: true,
        path: '/invalid-license',
        breadcrumb: 'Invalid License',
        render: () => <div>Invalid license</div>
      },
      {
        exact: true,
        path: '/services',
        component: Home,
        breadcrumb: 'Services'
      },
      { exact: true, path: '/traces', component: Home, breadcrumb: 'Traces' },
      {
        exact: true,
        path: '/:serviceName',
        breadcrumb: ({ match }: BreadcrumbArgs) => match.params.serviceName,
        render: (props: RenderArgs) =>
          renderAsRedirectTo(`/${props.match.params.serviceName}/transactions`)(
            props
          )
      }
    ]
  },
  {
    exact: true,
    path: '/:serviceName/transactions',
    component: ServiceDetails,
    breadcrumb: 'Transactions'
  },
  // Have to split this out as its own route to prevent duplicate breadcrumbs from both matching
  // if we use :transactionType? as a single route here
  {
    exact: true,
    path: '/:serviceName/transactions/:transactionType',
    component: ServiceDetails,
    breadcrumb: null
  },
  {
    exact: true,
    path: '/:serviceName/metrics',
    component: ServiceDetails,
    breadcrumb: 'Metrics'
  },
  {
    exact: true,
    path: '/:serviceName/transactions/:transactionType/:transactionName',
    component: TransactionDetails,
    breadcrumb: ({ match }: BreadcrumbArgs) =>
      legacyDecodeURIComponent(match.params.transactionName)
  }
];