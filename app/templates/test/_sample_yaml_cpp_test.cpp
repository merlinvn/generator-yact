<% if (unitTestType==="gtest"){%>
#include "gtest/gtest.h"
<% } else if (unitTestType==="catch"){%>
#include "catch.hpp"
<% } %>
#include "yaml-cpp/yaml.h"

<% if (unitTestType==="gtest"){%>
TEST(yaml_cpp_test, yaml_cpp_test) {
    YAML::Node node = YAML::Load("[1, 2, 3]");
    assert(node.Type() == YAML::NodeType::Sequence);
    assert(node.IsSequence());
}
<% } else if (unitTestType==="catch"){%>
TEST_CASE( "yaml_cpp_test", "[sampleyaml_cpp_test]" ) 
{
    YAML::Node node = YAML::Load("[1, 2, 3]");
    REQUIRE(node.Type() == YAML::NodeType::Sequence);
    REQUIRE(node.IsSequence());    
}
<% } %>