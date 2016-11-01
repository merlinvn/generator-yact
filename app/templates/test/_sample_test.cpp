<% if (unitTestType==="gtest"){%>
#include "gtest/gtest.h"

TEST(cpp_sorter_test, null_term_str_sort)
{
    EXPECT_EQ(1, 1);
}
<% } else if (unitTestType==="catch") { %>
#include "catch.hpp"

TEST_CASE( "Sameple Tets", "[sample]" ) 
{
    REQUIRE( 1 ==1 );
}

<% } %>