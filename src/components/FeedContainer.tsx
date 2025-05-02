import {
  IonButton,
  IonInput,
  IonCard,
  IonContent,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonAlert,
  IonText,
  IonAvatar,
  IonCol,
  IonRow,
  IonIcon,
  IonPopover,
  IonModal,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonTextarea,
  IonFooter,
  IonChip,
  IonLabel,
  IonGrid
} from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import {
  pencilOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline,
  ellipsisVertical
} from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  const modalRef = useRef<HTMLIonContentElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();

        if (userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('post_created_at', { ascending: false });

      if (data) setPosts(data as Post[]);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent.trim() || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data } = await supabase
      .from('posts')
      .insert([{ post_content: postContent.trim(), user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (data) {
      setPosts([data[0] as Post, ...posts]);
      setPostContent('');
    }
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
    setTimeout(() => modalRef.current?.scrollToTop(), 200);
  };

  const savePost = async () => {
    if (!postContent.trim() || !editingPost) return;

    const { data } = await supabase
      .from('posts')
      .update({ post_content: postContent.trim() })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {user && (
        <IonCard className="post-box animate-fade">
          <IonCardHeader>
            <IonCardTitle>What's on your mind?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              value={postContent}
              onIonChange={e => setPostContent(e.detail.value!)}
              placeholder="Share something awesome..."
              className="input-area"
            />
            <IonButton
              expand="block"
              onClick={createPost}
              disabled={!postContent.trim()}
              style={{ marginTop: '0.5rem' }}
            >
              Post
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}

      <IonGrid>
        {posts.map(post => (
          <IonRow key={post.post_id} className="animate-fade">
            <IonCol>
              <IonCard className="post-card">
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="auto">
                      <IonAvatar>
                        <img src={post.avatar_url} alt={`${post.username}'s avatar`} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle>{post.username}</IonCardTitle>
                      <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size="auto">
                      <IonButton
                        fill="clear"
                        onClick={(e) =>
                          setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })
                        }
                      >
                        <IonIcon icon={ellipsisVertical} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>

                <IonCardContent>
                  <IonText>{post.post_content}</IonText>
                  {post.post_created_at !== post.post_updated_at && (
                    <IonChip color="warning" outline style={{ marginTop: '10px' }}>
                      <IonLabel>Edited</IonLabel>
                    </IonChip>
                  )}
                </IonCardContent>

                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                >
                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
                    <IonButton fill="clear" onClick={() => { startEditingPost(post); setPopoverState({ open: false, event: null, postId: null }); }}>
                      Edit
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>
                      Delete
                    </IonButton>
                  </div>
                </IonPopover>
              </IonCard>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent ref={modalRef} className="ion-padding">
          <IonTextarea
            autoGrow
            value={postContent}
            placeholder="Edit your post here..."
            onIonChange={e => setPostContent(e.detail.value!)}
            className="edit-textarea"
          />
        </IonContent>
        <IonFooter className="ion-padding" style={{ display: 'flex', gap: '10px' }}>
          <IonButton expand="block" onClick={savePost}>
            Save
          </IonButton>
          <IonButton expand="block" color="medium" onClick={() => setIsModalOpen(false)}>
            Cancel
          </IonButton>
        </IonFooter>
      </IonModal>

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully!"
        buttons={['OK']}
      />
    </div>
  );
};

export default FeedContainer;
