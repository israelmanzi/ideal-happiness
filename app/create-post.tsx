import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import usePosts from '@/hooks/usePosts';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { validatePost } from '@/lib/utils';
import { useRouter } from 'expo-router';

const CreatePost = () => {
  const toast = useToast();
  const router = useRouter();
  const { createPost, creatingPost } = usePosts();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.body) {
      return toast.show('All fields are required!', {
        type: 'danger',
      });
    }

    const validationResults = validatePost(formData);

    if (!validationResults.title.valid) {
      return toast.show(validationResults.title.message, {
        type: 'danger',
      });
    }
    if (!validationResults.body.valid) {
      return toast.show(validationResults.body.message, {
        type: 'danger',
      });
    }

    createPost(formData, true);
  };

  return (
    <SafeAreaView className="p-3 px-5 h-full justify-center">
      <View>
        <Text className="text-2xl font-bold font-rubik text-gray-800">
          Create Post
        </Text>
      </View>
      <View className="mb-5 mt-8">
        <CustomInput
          value={formData.title}
          label="Post title"
          placeholder="Title ..."
          onChangeText={(val) => setFormData({ ...formData, title: val })}
        />
        <CustomInput
          value={formData.body}
          label="Post body"
          placeholder="Content ..."
          onChangeText={(val) => setFormData({ ...formData, body: val })}
          multiline
          numberOfLines={4}
          containerStyles="mt-3"
        />
      </View>
      <CustomButton
        title="Create Post"
        handlePress={handleSubmit}
        isLoading={creatingPost}
        containerStyles="mt-8"
      />
      <CustomButton
        title="Cancel"
        handlePress={() => router.push('/')}
        containerStyles="mt-8"
      />
    </SafeAreaView>
  );
};

export default CreatePost;
