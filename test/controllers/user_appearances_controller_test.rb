require "test_helper"

class UserAppearancesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_appearances_index_url
    assert_response :success
  end
end
