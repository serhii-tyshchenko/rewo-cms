import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SuspenseFallback } from '@components/common';

import { ROUTE } from '@constants';

import { useTheme } from '@hooks';

import { selectUserData } from '@store/selectors';

import { validateToken } from '@utils';

import ProtectedRoute from './protected-route';

const HomePage = lazy(() =>
  import('@pages').then((m) => ({ default: m.HomePage })),
);
const Posts = lazy(() => import('@pages').then((m) => ({ default: m.Posts })));
const PostEdit = lazy(() =>
  import('@pages').then((m) => ({ default: m.PostEdit })),
);
const PostAdd = lazy(() =>
  import('@pages').then((m) => ({ default: m.PostAdd })),
);
const Categories = lazy(() =>
  import('@pages').then((m) => ({ default: m.Categories })),
);
const TagsPage = lazy(() =>
  import('@pages').then((m) => ({ default: m.TagsPage })),
);
const MediaPage = lazy(() =>
  import('@pages').then((m) => ({ default: m.MediaPage })),
);
const UsersPage = lazy(() =>
  import('@pages').then((m) => ({ default: m.UsersPage })),
);
const CommentsPage = lazy(() =>
  import('@pages').then((m) => ({ default: m.CommentsPage })),
);
const LogIn = lazy(() => import('@pages').then((m) => ({ default: m.LogIn })));

function App() {
  const { isLogged, token } = useSelector(selectUserData);
  const isTokenValid = validateToken(token);
  const isAllowed = isLogged && isTokenValid;

  useTheme();

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route element={<ProtectedRoute allowed={isAllowed} />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.CATEGORIES} element={<Categories />} />
          <Route path={ROUTE.POSTS} element={<Posts />} />
          <Route path={ROUTE.POST_EDIT} element={<PostEdit />} />
          <Route path={ROUTE.POST_ADD} element={<PostAdd />} />
          <Route path={ROUTE.TAGS} element={<TagsPage />} />
          <Route path={ROUTE.MEDIA} element={<MediaPage />} />
          <Route path={ROUTE.USERS} element={<UsersPage />} />
          <Route path={ROUTE.COMMENTS} element={<CommentsPage />} />
          <Route path="*" element={<Navigate to={ROUTE.HOME} replace />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowed={!isAllowed} redirectPath={ROUTE.HOME} />
          }
        >
          <Route path={ROUTE.LOGIN} element={<LogIn />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
